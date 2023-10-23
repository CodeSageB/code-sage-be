import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dtos/createBlog.dto';
import { UpdateBlogDto } from './dtos/updateBlog.dto';
import { PaginationDto } from './dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './entities/Blog.entity';
import { DataSource, DeleteResult, QueryRunner, Repository } from 'typeorm';
import { Mappers } from './mappers';
import { LanguagesEnum } from '../shared/enums/languages.enum';
import { TagEntity } from './entities/Tag.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
    private dataSource: DataSource
  ) {}

  public async createBlog(blogData: CreateBlogDto): Promise<BlogEntity> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const blogEntity = new BlogEntity();

      blogEntity.translations = blogData.translations.map((translation) =>
        Mappers.createTranslationEntity(translation, blogEntity)
      );

      blogEntity.tags = await this.handleTags(queryRunner, blogData.tags);

      await queryRunner.manager.save(BlogEntity, blogEntity);

      await queryRunner.commitTransaction();

      return await this.blogRepository.findOneBy({
        externalId: blogEntity.externalId
      });
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
  public async fetchBlogs(
    paginationDto: PaginationDto,
    lang: LanguagesEnum,
    order: 'ASC' | 'DESC' = 'DESC'
  ): Promise<{ blogs: BlogEntity[]; totalCount: number }> {
    const queryBuilder = this.blogRepository.createQueryBuilder('blog');

    // Join with BlogTranslation entity
    queryBuilder.leftJoinAndSelect('blog.translations', 'translation');

    // Join with Tag entity
    queryBuilder.leftJoinAndSelect('blog.tags', 'tag');

    // Filter by language
    queryBuilder.where('translation.language = :lang', { lang: lang });

    // Apply pagination
    queryBuilder.take(paginationDto.take * paginationDto.page);
    queryBuilder.addOrderBy('blog.created', order);

    // // Always order tags
    queryBuilder.addOrderBy('tag.tag', 'ASC');

    const totalCount = await queryBuilder.getCount();
    const blogs = await queryBuilder.getMany();
    return { blogs, totalCount };
  }

  public async fetchBlog(
    uuid: string,
    lang: LanguagesEnum
  ): Promise<BlogEntity | null> {
    const queryBuilder = this.blogRepository.createQueryBuilder('blog');

    // Join with BlogTranslation entity
    queryBuilder.leftJoinAndSelect(
      'blog.translations',
      'translation',
      'translation.language = :lang',
      { lang: lang }
    );

    queryBuilder.leftJoinAndSelect('blog.tags', 'tag');

    // Filter by externalId
    queryBuilder.where('blog.externalId = :uuid', { uuid });

    return await queryBuilder.getOne();
  }

  public async updateBlog(
    uuid: string,
    blogData: UpdateBlogDto
  ): Promise<BlogEntity> {
    const blogEntity = await this.blogRepository.findOne({
      where: { externalId: uuid }
    });

    if (!blogEntity) {
      throw new NotFoundException('Blog not found');
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (blogData.tags) {
        blogEntity.tags = await this.handleTags(queryRunner, blogData.tags);
      }

      if (blogData.translations) {
        const updatedTranslations = blogData.translations.map((translation) =>
          Mappers.updateTranslationEntity(translation, blogEntity)
        );

        blogEntity.translations = [
          ...blogEntity.translations,
          ...updatedTranslations
        ];
      }

      await queryRunner.manager.save(BlogEntity, blogEntity);
      await queryRunner.commitTransaction();

      return await this.blogRepository.findOne({ where: { externalId: uuid } });
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
  public deleteBlog(uuid: string): Promise<DeleteResult> {
    return this.blogRepository.delete({ externalId: uuid });
  }

  private async handleTags(
    queryRunner: QueryRunner,
    tagsData: string[]
  ): Promise<TagEntity[]> {
    return await Promise.all(
      tagsData.map(async (tag) => {
        let tagEntity = await queryRunner.manager.findOneBy(TagEntity, {
          tag: tag
        });
        if (!tagEntity) {
          tagEntity = new TagEntity();
          tagEntity.tag = tag;
          await queryRunner.manager.save(TagEntity, tagEntity);
        }
        return tagEntity;
      })
    );
  }
}
