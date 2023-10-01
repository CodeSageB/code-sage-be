import { CreatedBlogDto, BlogDto, UpdatedBlogDto } from './dtos/blog.dto';
import { BlogEntity } from './entities/Blog.entity';
import { CreateBlogTranslationDto } from './dtos/createBlogTranslation.dto';
import { BlogTranslationEntity } from './entities/BlogTranslation.entity';
import { LanguagesEnum } from '../shared/enums/languages.enum';
import { UpdateBlogTranslationDto } from './dtos/updateBlogTranslation.dto';

export class Mappers {
  static blogEntityToBlogDto(
    blogEntity: BlogEntity,
    language: LanguagesEnum
  ): BlogDto {
    return {
      id: blogEntity.externalId,
      title: blogEntity.translations[0].title,
      content: blogEntity.translations[0].content,
      tags: blogEntity.tags,
      created: blogEntity.created,
      language
    };
  }

  static blogEntityToCreatedBlogDto(blogEntity: BlogEntity): CreatedBlogDto {
    return this.convertCreatedUpdatedDto(blogEntity);
  }

  static blogEntityToUpdatedBlogDto(blogEntity: BlogEntity): UpdatedBlogDto {
    return this.convertCreatedUpdatedDto(blogEntity);
  }

  static createBlogTranslationDtoToBlogTranslationEntity(
    createTranslationDto: CreateBlogTranslationDto,
    blogEntity: BlogEntity
  ): BlogTranslationEntity {
    const blogTranslation = new BlogTranslationEntity();

    blogTranslation.title = createTranslationDto.title;
    blogTranslation.content = createTranslationDto.content;
    blogTranslation.language = createTranslationDto.language;
    blogTranslation.blog = blogEntity;

    return blogTranslation;
  }

  static updateBlogTranslationDtoToBlogTranslationEntity(
    updateTranslationDto: UpdateBlogTranslationDto,
    blogEntity: BlogEntity
  ): BlogTranslationEntity {
    let translationEntity = blogEntity.translations.find(
      (t) => t.language === updateTranslationDto.language
    );

    if (!translationEntity) {
      // If translation does not exist, create a new one
      translationEntity = new BlogTranslationEntity();
      translationEntity.language = updateTranslationDto.language;
      translationEntity.blog = blogEntity;
    }

    // Update the fields
    if (updateTranslationDto.title) {
      translationEntity.title = updateTranslationDto.title;
    }

    if (updateTranslationDto.content) {
      translationEntity.content = updateTranslationDto.content;
    }

    return translationEntity;
  }

  private static convertCreatedUpdatedDto(
    blogEntity: BlogEntity
  ): CreatedBlogDto | UpdatedBlogDto {
    return {
      id: blogEntity.externalId,
      tags: blogEntity.tags,
      created: blogEntity.created,
      translations: blogEntity.translations.map((translation) => ({
        title: translation.title,
        content: translation.content,
        language: translation.language
      }))
    };
  }
}
