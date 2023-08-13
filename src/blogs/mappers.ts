import { BlogDto } from './dtos/blog.dto';
import { BlogEntity } from '../typeorm/entities/Blog.entity';
import { CreateBlogDto } from './dtos/createBlog.dto';
import { UpdateBlogDto } from './dtos/updateBlog.dto';

export class Mappers {
  static blogEntityToBlogDto(blogEntity: BlogEntity): BlogDto {
    return {
      id: blogEntity.externalId,
      title: blogEntity.title,
      content: blogEntity.content,
      created: blogEntity.created
    };
  }

  static createBlogDtoToBlogEntity(createBlogDto: CreateBlogDto): BlogEntity {
    return this.convertCreateUpdateDto(createBlogDto);
  }

  static updateBlogDtoToBlogEntity(updateBlogDto: UpdateBlogDto): BlogEntity {
    return this.convertCreateUpdateDto(updateBlogDto);
  }

  private static convertCreateUpdateDto(
    createUpdateDto: CreateBlogDto | UpdateBlogDto
  ): BlogEntity {
    const blog = new BlogEntity();

    blog.title = createUpdateDto.title;
    blog.content = createUpdateDto.content;

    return blog;
  }
}
