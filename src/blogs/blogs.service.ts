import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dtos/createBlog.dto';
import { UpdateBlogDto } from './dtos/updateBlog.dto';
import { PaginationDto } from './dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './entities/Blog.entity';
import { DataSource, DeleteResult, Repository } from 'typeorm';
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
      const savedBlogEntity = await queryRunner.manager.save(blogEntity);

      for (const tag of blogData.tags) {
        const tagEntity = new TagEntity();
        tagEntity.tag = tag;
        tagEntity.blog = blogEntity;
        await queryRunner.manager.save(tagEntity);
      }

      for (const translation of blogData.translations) {
        const blogTranslationEntity =
          Mappers.createBlogTranslationDtoToBlogTranslationEntity(
            translation,
            savedBlogEntity
          );

        await queryRunner.manager.save(blogTranslationEntity);
      }

      await queryRunner.commitTransaction();

      return await this.blogRepository.findOneBy({
        externalId: savedBlogEntity.externalId
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
    orderBy = 'created',
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
    queryBuilder.addOrderBy(`blog.${orderBy}`, order);

    // Always order tags
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
      await queryRunner.manager.save(blogEntity);

      if (blogData.tags) {
        for (const tag of blogData.tags) {
          const tagEntity = new TagEntity();
          tagEntity.tag = tag;
          tagEntity.blog = blogEntity;
          await queryRunner.manager.save(tagEntity);
        }
      }

      // Update translations
      if (blogData.translations) {
        for (const translationData of blogData.translations) {
          await queryRunner.manager.save(
            Mappers.updateBlogTranslationDtoToBlogTranslationEntity(
              translationData,
              blogEntity
            )
          );
        }
      }
      await queryRunner.commitTransaction();

      //Refresh the entity
      return await this.blogRepository.findOneBy({
        externalId: uuid
      });
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
}
