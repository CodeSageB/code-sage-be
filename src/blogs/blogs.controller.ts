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
  Put,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { CreateBlogDto } from './dtos/createBlog.dto';
import { BlogsService } from './blogs.service';
import { UpdateBlogDto } from './dtos/updateBlog.dto';
import { PaginationDto } from './dtos/pagination.dto';
import { Mappers } from './mappers';
import { CreatedBlogDto, BlogDto, UpdatedBlogDto } from './dtos/blog.dto';
import { LanguageDto } from '../shared/dtos/language.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogsService) {}

  @Post()
  async createBlog(
    @Body() createBlogDto: CreateBlogDto
  ): Promise<CreatedBlogDto> {
    const blog = await this.blogService.createBlog(createBlogDto);

    if (!blog) {
      throw new BadRequestException('Bad request');
    }

    return Mappers.blogEntityToCreatedBlogDto(blog);
  }

  @Post('all')
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  async getBlogs(
    @Body() paginationDto: PaginationDto,
    @Query() lang: LanguageDto
  ): Promise<BlogDto[]> {
    const blogs = await this.blogService.fetchBlogs(paginationDto);

    return blogs.map((blog) => Mappers.blogEntityToBlogDto(blog, lang.lang));
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getBlog(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() lang: LanguageDto
  ): Promise<BlogDto> {
    const blog = await this.blogService.fetchBlog(id);

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    return Mappers.blogEntityToBlogDto(blog, lang.lang);
  }

  @Put(':id')
  async updateBlog(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBlogDto: UpdateBlogDto
  ): Promise<UpdatedBlogDto> {
    const blog = await this.blogService.updateBlog(id, updateBlogDto);

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    return Mappers.blogEntityToUpdatedBlogDto(blog);
  }

  @Delete(':id')
  async deleteBlog(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const res = await this.blogService.deleteBlog(id);

    if (!res.affected) {
      throw new NotFoundException('Blog not found');
    }
  }
}
