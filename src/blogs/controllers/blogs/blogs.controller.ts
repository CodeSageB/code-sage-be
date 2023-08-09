import {
  Body,
  Controller,
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
import { BlogSuccessDto } from '../../dtos/swagger/blogSuccess.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Blog } from '../../schema/blogs';
import { BlogDto } from '../../dtos/blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogsService) {}

  @ApiResponse({
    status: 201,
    description: 'The blog has been successfully created.',
    type: BlogSuccessDto
  })
  @Post()
  createBlog(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.createBlog(createBlogDto);
  }

  @ApiResponse({
    status: 201,
    type: [BlogSuccessDto]
  })
  @Post('all')
  getBlogs(@Body() paginationDto: PaginationDto) {
    return this.blogService.fetchBlogs(paginationDto);
  }

  @ApiResponse({
    status: 200,
    type: BlogSuccessDto
  })
  @Get(':id')
  async getBlogById(@Param('id', ParseUUIDPipe) id: string) {
    const blog = await this.blogService.fetchBlogById(id);
    if (!blog) {
      throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
    }

    return this.blogConverter(blog);
  }

  @ApiResponse({
    status: 200,
    type: BlogSuccessDto
  })
  @Put(':id')
  updateBlogById(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto
  ) {
    return this.blogService.updateBlogById(id, updateBlogDto);
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
