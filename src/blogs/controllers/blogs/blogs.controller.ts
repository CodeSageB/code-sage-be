import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { CreateBlogDto } from "../../dtos/createBlog.dto";
import { BlogsService } from "../../services/blogs/blogs.service";
import { UpdateBlogDto } from "../../dtos/updateBlog.dto";
import { PaginationDto } from "../../dtos/pagination.dto";

@Controller("blogs")
export class BlogsController {

  constructor(private blogService: BlogsService) {
  }


  @Post()
  createBlog(@Body() createBlogDto: CreateBlogDto) {
    //TODO Validatce createBlogDto by pipe
    return this.blogService.createBlog(createBlogDto);
  }

  @Post("all")
  getBlogs(@Body() paginationDto: PaginationDto) {
    //TODO Validate paginationDto by pipe
    if (!paginationDto || Object.keys(paginationDto).length === 0) {
      throw new HttpException("Pagination data is required", HttpStatus.BAD_REQUEST);
    }

    return this.blogService.fetchBlogs(paginationDto);
  }

  @Get(":id")
  getBlogById(@Param("id") id: string) {
    const blog = this.blogService.fetchBlogById(id);

    if (!blog) {
      throw new HttpException("Blog not found", HttpStatus.NOT_FOUND);
    }

    return blog;
  }

  @Put(":id")
  updateBlogById(@Param("id") id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.updateBlogById(id, updateBlogDto);
  }

}
