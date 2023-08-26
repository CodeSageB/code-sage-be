import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put
} from '@nestjs/common';
import { CreateBlogDto } from './dtos/createBlog.dto';
import { BlogsService } from './blogs.service';
import { UpdateBlogDto } from './dtos/updateBlog.dto';
import { PaginationDto } from './dtos/pagination.dto';
import { Mappers } from './mappers';
import { BlogDto } from './dtos/blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogsService) {}

  @Post()
  async createBlog(@Body() createBlogDto: CreateBlogDto): Promise<BlogDto> {
    const blog = await this.blogService.createBlog(createBlogDto);

    if (!blog) {
      throw new BadRequestException('Bad request');
    }

    return Mappers.blogEntityToBlogDto(blog);
  }

  @Post('all')
  @HttpCode(200)
  async getBlogs(@Body() paginationDto: PaginationDto): Promise<BlogDto[]> {
    const blogs = await this.blogService.fetchBlogs(paginationDto);

    return blogs.map((blog) => Mappers.blogEntityToBlogDto(blog));
  }

  @Get(':id')
  async getBlog(@Param('id', ParseUUIDPipe) id: string): Promise<BlogDto> {
    const blog = await this.blogService.fetchBlog(id);

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    return Mappers.blogEntityToBlogDto(blog);
  }

  @Put(':id')
  async updateBlog(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBlogDto: UpdateBlogDto
  ): Promise<BlogDto> {
    const blog = await this.blogService.updateBlog(id, updateBlogDto);

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    return Mappers.blogEntityToBlogDto(blog);
  }

  @Delete(':id')
  async deleteBlog(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const res = await this.blogService.deleteBlog(id);

    if (!res.affected) {
      throw new NotFoundException('Blog not found');
    }
  }
}
