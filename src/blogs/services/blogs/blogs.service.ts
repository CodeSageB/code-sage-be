import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from '../../dtos/createBlog.dto';
import { Blog, CreateBlog } from '../../schema/blogs';
import { UpdateBlogDto } from '../../dtos/updateBlog.dto';
import { PaginationDto } from '../../dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from '../../../typeorm/entities/Blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogsService {
  //Generate lorem ipsum
  blogs: Blog[] = [
    {
      id: 1,
      externalId: 'c013f7f3-5b63-4f6a-bd5e-3c51e937bb8a',
      title: 'Getting Started with NestJS',
      content: 'NestJS is a powerful framework...',
      created: new Date('2023-07-15T10:30:00Z'),
      updated: new Date('2023-07-15T10:30:00Z')
    },
    {
      id: 2,
      externalId: 'c013f7f3-5b63-4f6a-bd5e-3c51e937bb8a',
      title: 'Mastering TypeScript Basics',
      content: 'TypeScript is a superset of JavaScript...',
      created: new Date('2023-07-10T14:20:00Z'),
      updated: new Date('2023-07-15T10:30:00Z')
    },
    {
      id: 3,
      externalId: 'c013f7f3-5b63-4f6a-bd5e-3c51e937bb8a',
      title: 'Creating RESTful APIs with Express',
      content: 'Express is a popular web application framework...',
      created: new Date('2023-07-05T16:45:00Z'),
      updated: new Date('2023-07-15T10:30:00Z')
    }
  ];

  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>
  ) {}

  public createBlog(blogData: CreateBlogDto): Promise<Blog> {
    const blog: CreateBlog = {
      ...blogData
    };

    return this.blogRepository.save(blog);
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
