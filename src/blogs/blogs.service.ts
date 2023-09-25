import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dtos/createBlog.dto';
import { NewUpdateBlogDto } from './dtos/updateBlog.dto';
import { PaginationDto } from './dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './entities/Blog.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Mappers } from './mappers';
import { BlogTranslationEntity } from './entities/BlogTranslation.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
    @InjectRepository(BlogTranslationEntity)
    private readonly blogTranslationRepository: Repository<BlogTranslationEntity>
  ) {}

  public async createBlog(blogData: CreateBlogDto): Promise<BlogEntity> {
    const blogEntity = new BlogEntity();
    blogEntity.tags = blogData.tags;

    const savedBlogEntity = await this.blogRepository.save(blogEntity);

    for (const translation of blogData.translations) {
      const blogTranslationEntity =
        Mappers.createBlogTranslationDtoToBlogTranslationEntity(
          translation,
          savedBlogEntity
        );

      await this.blogTranslationRepository.save(blogTranslationEntity);
    }

    return await this.blogRepository.findOneBy({
      externalId: savedBlogEntity.externalId
    });
  }

  public fetchBlogs(paginationDto: PaginationDto): Promise<BlogEntity[]> {
    return this.blogRepository.find({ take: paginationDto.take });
  }

  public fetchBlog(uuid: string): Promise<BlogEntity> {
    return this.blogRepository.findOneBy({ externalId: uuid });
  }

  public async updateBlog(
    uuid: string,
    blogData: NewUpdateBlogDto
  ): Promise<BlogEntity> {
    const blogEntity = await this.blogRepository.findOne({
      where: { externalId: uuid },
      relations: ['translations']
    });

    if (!blogEntity) {
      throw new NotFoundException('Blog not found');
    }

    if (blogData.tags) {
      blogEntity.tags = blogData.tags;
    }

    await this.blogRepository.save(blogEntity);

    // Update translations
    if (blogData.translations) {
      for (const translationData of blogData.translations) {
        await this.blogTranslationRepository.save(
          Mappers.updateBlogTranslationDtoToBlogTranslationEntity(
            translationData,
            blogEntity
          )
        );
      }
    }

    //Refresh the entity
    return await this.blogRepository.findOneBy({
      externalId: uuid
    });
  }

  public deleteBlog(uuid: string): Promise<DeleteResult> {
    return this.blogRepository.delete({ externalId: uuid });
  }
}
