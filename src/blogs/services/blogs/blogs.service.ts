import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from '../../dtos/createBlog.dto';
import { Blog } from '../../models/blogs';
import { UpdateBlogDto } from '../../dtos/updateBlog.dto';
import { PaginationDto } from '../../dtos/pagination.dto';

@Injectable()
export class BlogsService {
  //Generate lorem ipsum
  blogs: Blog[] = [
    {
      id: 'c013f7f3-5b63-4f6a-bd5e-3c51e937bb8a',
      title: 'Getting Started with NestJS',
      content: 'NestJS is a powerful framework...',
      created: new Date('2023-07-15T10:30:00Z')
    },
    {
      id: '28e0a86f-117f-45e9-8679-66584c4820f2',
      title: 'Mastering TypeScript Basics',
      content: 'TypeScript is a superset of JavaScript...',
      created: new Date('2023-07-10T14:20:00Z')
    },
    {
      id: '9af6c9eb-2a71-43a3-a152-2ff370d7f849',
      title: 'Creating RESTful APIs with Express',
      content: 'Express is a popular web application framework...',
      created: new Date('2023-07-05T16:45:00Z')
    }
  ];

  public createBlog(blogData: CreateBlogDto) {
    const blog: Blog = {
      id: (this.blogs.length + 1).toString(), //TODO Generate GUID
      created: new Date(),
      ...blogData
    };

    this.blogs.push(blog);
    return;
  }

  public fetchBlogs(pagination: PaginationDto) {
    const { page, limit } = pagination;

    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, this.blogs.length);

    return this.blogs.slice(startIndex, endIndex);
  }

  public fetchBlogById(id: string) {
    return this.blogs.find((blog) => blog.id === id);
  }

  public updateBlogById(id: string, blogData: UpdateBlogDto) {
    const blog = this.fetchBlogById(id);
    const blogIndex = this.blogs.findIndex((blog) => blog.id === id);
    this.blogs[blogIndex] = { ...blog, ...blogData };
    return;
  }
}
