import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from '../../dtos/createBlog.dto';
import { UpdateBlogDto } from '../../dtos/updateBlog.dto';
import { PaginationDto } from '../../dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from '../../../typeorm/entities/Blog.entity';
import { Repository } from 'typeorm';
import { Mappers } from '../../mappers';

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

  public fetchBlogs(paginationDto: PaginationDto) {
    return this.blogRepository.find({ take: paginationDto.take });
  }

  public fetchBlog(uuid: string) {
    return this.blogRepository.findOneBy({ externalId: uuid });
  }

  public async updateBlog(uuid: string, blogData: UpdateBlogDto) {
    await this.blogRepository.update(
      { externalId: uuid },
      Mappers.updateBlogDtoToBlogEntity(blogData)
    );

    return this.fetchBlog(uuid);
  }

  public deleteBlog(uuid: string) {
    return this.blogRepository.delete({ externalId: uuid });
  }
}
