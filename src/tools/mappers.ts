import { BlogDto } from '../blogs/dtos/blog.dto';
import { BlogEntity } from '../typeorm/entities/Blog.entity';

export class Mappers {
  static blogEntityToBlogDto(blogEntity: BlogEntity): BlogDto {
    return {
      id: blogEntity.externalId,
      title: blogEntity.title,
      content: blogEntity.content,
      created: blogEntity.created
    };
  }
}
