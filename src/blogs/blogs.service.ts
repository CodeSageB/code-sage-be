import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dtos/createBlog.dto';
import { UpdateBlogDto } from './dtos/updateBlog.dto';
import { PaginationDto } from './dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './entities/Blog.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Mappers } from './mappers';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>
  ) {}

  public createBlog(blogData: CreateBlogDto): Promise<BlogEntity> {
    return this.blogRepository.save(
      Mappers.createBlogDtoToBlogEntity(blogData)
    );
  }

  public fetchBlogs(paginationDto: PaginationDto): Promise<BlogEntity[]> {
    return this.blogRepository.find({ take: paginationDto.take });
  }

  public fetchBlog(uuid: string): Promise<BlogEntity> {
    return this.blogRepository.findOneBy({ externalId: uuid });
  }

  public async updateBlog(
    uuid: string,
    blogData: UpdateBlogDto
  ): Promise<BlogEntity> {
    await this.blogRepository.update(
      { externalId: uuid },
      Mappers.updateBlogDtoToBlogEntity(blogData)
    );

    return this.fetchBlog(uuid);
  }

  public deleteBlog(uuid: string): Promise<DeleteResult> {
    return this.blogRepository.delete({ externalId: uuid });
  }
}
