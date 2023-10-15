import { MigrationInterface, QueryRunner } from 'typeorm';
import { BlogEntity } from '../../src/blogs/entities/Blog.entity';
import { BlogTranslationEntity } from '../../src/blogs/entities/BlogTranslation.entity';
import { v4 as uuid } from 'uuid';

export class SeedBlogsAndTranslations1697283847118
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const blogs: BlogEntity[] = [];
    const translations: Partial<BlogTranslationEntity>[] = [];

    for (let i = 1; i <= 100; i++) {
      const blog = new BlogEntity();
      blog.externalId = uuid();
      blog.tags = ['programming', 'IT'];
      blogs.push(blog);

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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Logic to revert the seed if needed
    await queryRunner.query('DELETE FROM "BlogTranslation";');
    await queryRunner.query('DELETE FROM "Blog";');
  }
}
