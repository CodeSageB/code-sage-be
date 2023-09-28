import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dtos/createBlog.dto';
import { UpdateBlogDto } from './dtos/updateBlog.dto';
import { PaginationDto } from './dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './entities/Blog.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Mappers } from './mappers';
import { BlogTranslationEntity } from './entities/BlogTranslation.entity';
import { LanguagesEnum } from '../shared/enums/languages.enum';

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

  public async fetchBlogs(
    paginationDto: PaginationDto,
    lang: LanguagesEnum
  ): Promise<BlogEntity[]> {
    const queryBuilder = this.blogRepository.createQueryBuilder('blog');

    // Join with BlogTranslation entity
    queryBuilder.leftJoinAndSelect('blog.translations', 'translation');

    // Filter by language
    queryBuilder.where('translation.language = :lang', { lang: lang });

    // Apply pagination
    queryBuilder.take(paginationDto.take);

    return await queryBuilder.getMany();
  }

  public async fetchBlog(
    uuid: string,
    lang: LanguagesEnum
  ): Promise<BlogEntity | null> {
    const queryBuilder = this.blogRepository.createQueryBuilder('blog');

    // Join with BlogTranslation entity
    queryBuilder.leftJoinAndSelect(
      'blog.translations',
      'translation',
      'translation.language = :lang',
      { lang: lang }
    );

    // Filter by externalId
    queryBuilder.where('blog.externalId = :uuid', { uuid });

    return await queryBuilder.getOne();
  }

  public async updateBlog(
    uuid: string,
    blogData: UpdateBlogDto
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
