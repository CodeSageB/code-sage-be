import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { CreateBlogDto } from './dtos/createBlog.dto';
import { UpdateBlogDto } from './dtos/updateBlog.dto';
import { PaginationDto } from './dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './entities/Blog.entity';
import { DataSource, DeleteResult, QueryRunner, Repository } from 'typeorm';
import { Mappers } from './mappers';
import { LanguagesEnum } from '../shared/enums/languages.enum';
import { TagEntity } from './entities/Tag.entity';
import { BlogTranslationEntity } from './entities/BlogTranslation.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
    @InjectRepository(BlogTranslationEntity)
    private readonly blogTranslationRepository: Repository<BlogTranslationEntity>,
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
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

  public async fetchBlogs(
    paginationDto: PaginationDto,
    lang: LanguagesEnum,
    order: 'ASC' | 'DESC' = 'DESC'
  ): Promise<{ blogs: BlogEntity[]; totalCount: number }> {
    const queryBuilder = this.blogRepository
      .createQueryBuilder('blog')
      .innerJoinAndSelect(
        'blog.translations',
        'translation',
        'translation.language = :lang',
        { lang }
      )
      .orderBy('blog.created', order)
      .take(paginationDto.take * paginationDto.page);

    const [blogs, totalCount] = await queryBuilder.getManyAndCount();

    const blogsWithTags = await Promise.all(
      blogs.map(async (blog) => {
        blog.tags = await this.fetchTags(blog);
        return blog;
      })
    );

    return { blogs: blogsWithTags, totalCount };
  }

  public async fetchBlog(
    uuid: string,
    lang?: LanguagesEnum
  ): Promise<BlogEntity | null> {
    const blog = await this.blogRepository
      .createQueryBuilder('blog')
      .where('blog.externalId = :uuid', { uuid })
      .getOne();

    if (!blog) return null;

    const [translations, tags] = await Promise.all([
      this.fetchTranslations(blog, lang),
      this.fetchTags(blog)
    ]);

    blog.translations = translations;
    blog.tags = tags;

    return blog;
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

  private async fetchTranslations(
    blog: BlogEntity,
    lang?: LanguagesEnum
  ): Promise<BlogTranslationEntity[]> {
    try {
      const query = this.blogTranslationRepository
        .createQueryBuilder('translation')
        .where('translation.blogId = :blogId', { blogId: blog.id });

      if (lang) {
        query.andWhere('translation.language = :lang', { lang });
      }

      return query.getMany();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching translations');
    }
  }

  private async fetchTags(blog: BlogEntity): Promise<TagEntity[]> {
    try {
      return await this.tagRepository
        .createQueryBuilder('tag')
        .innerJoin('tag.blogs', 'blog', 'blog.id = :blogId', {
          blogId: blog.id
        })
        .orderBy('tag.tag', 'ASC')
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching tags');
    }
  }
}
