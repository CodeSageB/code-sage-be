import { MigrationInterface, QueryRunner } from 'typeorm';
import { BlogEntity } from '../../src/blogs/entities/Blog.entity';
import { BlogTranslationEntity } from '../../src/blogs/entities/BlogTranslation.entity';
import { TagEntity } from '../../src/blogs/entities/Tag.entity';
import { v4 as uuid } from 'uuid';

export class SeedData1697477890236 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const blogs: BlogEntity[] = [];
    const translations: Partial<BlogTranslationEntity>[] = [];
    const tags: TagEntity[] = [];

    for (let i = 1; i <= 100; i++) {
      const blog = new BlogEntity();
      blog.externalId = uuid();
      blogs.push(blog);

      for (const tag of ['programming', 'IT', 'software']) {
        const tagEntity = new TagEntity();
        tagEntity.tag = tag;
        tagEntity.blog = blog;
        tags.push(tagEntity);
      }

      // Randomly assign language(s) to each blog entry
      const languages = ['en', 'cs'];
      const selectedLanguages = languages
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.ceil(Math.random() * 2));

      for (const language of selectedLanguages) {
        const translation: Partial<BlogTranslationEntity> = {
          language: language,
          title: `Blog Title ${i}`,
          content: `Blog Content ${i} about programming and IT.`,
          blog: blog // Associate the translation with the blog
        };
        translations.push(translation);
      }
    }

    await queryRunner.manager.save(BlogEntity, blogs);
    // Once blogs have been saved, they have generated IDs which will be used to save translations
    await queryRunner.manager.save(BlogTranslationEntity, translations);

    await queryRunner.manager.save(TagEntity, tags);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Logic to revert the seed if needed
    await queryRunner.query('DELETE FROM "BlogTranslation";');
    await queryRunner.query('DELETE FROM "Blog";');
    await queryRunner.query('DELETE FROM "Tag";');
  }
}
