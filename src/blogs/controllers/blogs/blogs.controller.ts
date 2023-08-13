import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put
} from '@nestjs/common';
import { CreateBlogDto } from '../../dtos/createBlog.dto';
import { BlogsService } from '../../services/blogs/blogs.service';
import { UpdateBlogDto } from '../../dtos/updateBlog.dto';
import { PaginationDto } from '../../dtos/pagination.dto';
import { HttpExceptions } from '../../../tools/http-exceptions';
import { Mappers } from '../../mappers';

@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogsService) {}

  // TODO Global exception kde budou i logy
  // TODO Intergacni testy
  @Post()
  async createBlog(@Body() createBlogDto: CreateBlogDto) {
    const blog = await this.blogService.createBlog(createBlogDto);

    if (!blog) {
      throw HttpExceptions.badRequest();
    }

    return Mappers.blogEntityToBlogDto(blog);
  }

  @Post('all')
  async getBlogs(@Body() paginationDto: PaginationDto) {
    const blogs = await this.blogService.fetchBlogs(paginationDto);

    return blogs.map((blog) => Mappers.blogEntityToBlogDto(blog));
  }

  @Get(':id')
  async getBlog(@Param('id', ParseUUIDPipe) id: string) {
    const blog = await this.blogService.fetchBlog(id);

    if (!blog) {
      throw HttpExceptions.notFound();
    }

    return Mappers.blogEntityToBlogDto(blog);
  }

  @Put(':id')
  async updateBlog(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBlogDto: UpdateBlogDto
  ) {
    const blog = await this.blogService.updateBlog(id, updateBlogDto);

    if (!blog) {
      throw HttpExceptions.notFound();
    }

    return Mappers.blogEntityToBlogDto(blog);
  }

  @Delete(':id')
  async deleteBlog(@Param('id', ParseUUIDPipe) id: string) {
    const res = await this.blogService.deleteBlog(id);

    if (!res.affected) {
      throw HttpExceptions.notFound();
    }
  }
}
