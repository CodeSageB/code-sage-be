import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put
} from '@nestjs/common';
import { CreateBlogDto } from '../../dtos/createBlog.dto';
import { BlogsService } from '../../services/blogs/blogs.service';
import { UpdateBlogDto } from '../../dtos/updateBlog.dto';
import { PaginationDto } from '../../dtos/pagination.dto';
import { Blog } from '../../schema/blogs';
import { BlogDto } from '../../dtos/blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogsService) {}

  @Post()
  async createBlog(@Body() createBlogDto: CreateBlogDto) {
    const blog = await this.blogService.createBlog(createBlogDto);

    if (!blog) {
      throw new HttpException('Blog not created', HttpStatus.BAD_REQUEST);
    }

    return this.blogConverter(blog);
  }

  @Post('all')
  async getBlogs(@Body() paginationDto: PaginationDto) {
    const blogs = await this.blogService.fetchBlogs(paginationDto);

    return blogs.map((blog) => this.blogConverter(blog));
  }

  @Get(':id')
  async getBlog(@Param('id', ParseUUIDPipe) id: string) {
    const blog = await this.blogService.fetchBlog(id);

    if (!blog) {
      throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
    }

    return this.blogConverter(blog);
  }

  @Put(':id')
  async updateBlog(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBlogDto: UpdateBlogDto
  ) {
    const blog = await this.blogService.updateBlog(id, updateBlogDto);

    if (!blog) {
      throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
    }

    return this.blogConverter(blog);
  }

  @Delete(':id')
  async deleteBlog(@Param('id', ParseUUIDPipe) id: string) {
    const res = await this.blogService.deleteBlog(id);

    if (res.affected === 0) {
      throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
    }
  }

  private blogConverter(blog: Blog): BlogDto {
    return {
      id: blog.externalId,
      title: blog.title,
      content: blog.content,
      created: blog.created
    };
  }
}
