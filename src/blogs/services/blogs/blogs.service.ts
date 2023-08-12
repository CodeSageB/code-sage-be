import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from '../../dtos/createBlog.dto';
import { UpdateBlogDto } from '../../dtos/updateBlog.dto';
import { PaginationDto } from '../../dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from '../../../typeorm/entities/Blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>
  ) {}

  public createBlog(blogData: CreateBlogDto): Promise<BlogEntity> {
    // TODO pouzit createBlogDto nebo prevest do entity?
    return this.blogRepository.save(blogData);
  }

  public fetchBlogs(paginationDto: PaginationDto) {
    return this.blogRepository.find({ take: paginationDto.limit });
  }

  public fetchBlog(uuid: string) {
    return this.blogRepository.findOneBy({ externalId: uuid });
  }

  public async updateBlog(uuid: string, blogData: UpdateBlogDto) {
    await this.blogRepository
      .createQueryBuilder()
      .update()
      .set({ ...blogData })
      .where('externalId = :uuid', { uuid })
      .execute();

    return this.fetchBlog(uuid);
  }

  public deleteBlog(uuid: string) {
    return this.blogRepository.delete({ externalId: uuid });
  }
}
