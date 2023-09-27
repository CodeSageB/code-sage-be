import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from '../../entities/Blog.entity';
import { BlogsController } from '../../blogs.controller';
import * as request from 'supertest';
import { BlogsService } from '../../blogs.service';
import { ConfigTestHelper } from '../../../shared/test/config-test-helper';
import { Repository } from 'typeorm';
import { CreateBlogDto } from '../../dtos/createBlog.dto';
import { UpdateBlogDto } from '../../dtos/updateBlog.dto';
import { PaginationDto } from '../../dtos/pagination.dto';
import {
  blogTestArray,
  blogTest,
  blogTest2,
  blogTestEn,
  blogTestCs
} from '../../../shared/test/blog-test-data';
import { LanguagesEnum } from '../../../shared/enums/languages.enum';
import { BlogTranslationDto } from '../../dtos/blog.dto';
import { BlogTranslationEntity } from '../../entities/BlogTranslation.entity';
//TODO fix
describe('BlogsController (integration)', () => {
  let app: INestApplication;
  let pgContainer: StartedTestContainer;
  let blogRepository: Repository<BlogEntity>;
  let blogTranslationRepository: Repository<BlogTranslationEntity>;

  const seedDatabase = async function (data: CreateBlogDto[]): Promise<void> {
    const entities = data.map((blog) => blogRepository.create(blog));
    await blogRepository.save(entities);
  };

  beforeAll(async () => {
    pgContainer = await new GenericContainer('postgres')
      .withEnvironment(ConfigTestHelper.getTestEnvVariables)
      .withExposedPorts(ConfigTestHelper.getPort)
      .start();

    const moduleFixture = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          ...ConfigTestHelper.prepareTypeOrmOptions(pgContainer),
          entities: [BlogEntity, BlogTranslationEntity]
        }),
        TypeOrmModule.forFeature([BlogEntity, BlogTranslationEntity])
      ],
      providers: [BlogsService],
      controllers: [BlogsController]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    blogRepository = moduleFixture.get<Repository<BlogEntity>>(
      getRepositoryToken(BlogEntity)
    );
    blogTranslationRepository = moduleFixture.get<
      Repository<BlogTranslationEntity>
    >(getRepositoryToken(BlogTranslationEntity));
  }, 60000);

  afterEach(async () => {
    await blogTranslationRepository.delete({});
    await blogRepository.delete({});
  });

  afterAll(async () => {
    await pgContainer.stop();
    await app.close();
  });

  describe('POST /blogs', () => {
    it('should create a new blog', async () => {
      // Arrange
      const createBlogDto: CreateBlogDto = { ...blogTest };

      // Act
      const response = await request(app.getHttpServer())
        .post('/blogs')
        .send({ ...createBlogDto });

      // Assert
      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body.id).toBeDefined();
      expect(response.body.translations).toEqual(
        expect.arrayContaining(createBlogDto.translations)
      );
      expect(response.body.tags).toEqual(
        expect.arrayContaining(createBlogDto.tags)
      );
      expect(response.body.created).toBeDefined();
    });

    it('should return 400 if blog data is not valid', async () => {
      // Arrange
      const createBlogDto: CreateBlogDto = { translations: [], tags: [] };

      // Act
      const response = await request(app.getHttpServer())
        .post('/blogs')
        .send(createBlogDto);

      // Assert
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when tags is empty', async () => {
      // Arrange
      const createBlogDto: CreateBlogDto = { ...blogTest, tags: [] };

      // Act
      const response = await request(app.getHttpServer())
        .post('/blogs')
        .send(createBlogDto);

      // Assert
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when translations is empty', async () => {
      // Arrange
      const createBlogDto: CreateBlogDto = { ...blogTest, translations: [] };

      // Act
      const response = await request(app.getHttpServer())
        .post('/blogs')
        .send(createBlogDto);

      // Assert
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when translations language is not from enum', async () => {
      // Arrange
      const createBlogDto: CreateBlogDto = {
        ...blogTest,
        translations: [
          {
            title: 'Programming 101',
            content: 'Introduction to programming.',
            language: 'invalid-language' as LanguagesEnum
          }
        ]
      };

      // Act
      const response = await request(app.getHttpServer())
        .post('/blogs')
        .send(createBlogDto);

      // Assert
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('POST /blogs/all', () => {
    it('should return 10 blogs by default', async () => {
      // Arrange
      await seedDatabase(blogTestArray);

      // Act
      const response = await request(app.getHttpServer()).post(
        '/blogs/all?lang=cs'
      );

      // Assert
      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body.length).toBe(10);
    });

    it('should return blogs according to pagination', async () => {
      // Arrange
      await seedDatabase(blogTestArray);

      const pagination: PaginationDto = {
        take: 5
      };

      // Act
      const response = await request(app.getHttpServer())
        .post('/blogs/all?lang=en')
        .send(pagination);

      // Assert
      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body.length).toBe(pagination.take);
    });

    it('should return empty array if no blogs', async () => {
      // Act
      const response = await request(app.getHttpServer()).post(
        '/blogs/all?lang=en'
      );

      // Assert
      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body.length).toBe(0);
    });
  });

  describe('GET /blogs/:id', () => {
    it('should return a specific blog by ID and language', async () => {
      // Arrange
      const testBlog = await blogRepository.save({ ...blogTest });

      // Act
      const response = await request(app.getHttpServer()).get(
        `/blogs/${testBlog.externalId}?language=${LanguagesEnum.EN}`
      );

      // Assert
      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body.id).toBe(testBlog.externalId);
      expect(response.body.title).toBe(testBlog.translations[0].title);
      expect(response.body.content).toBe(testBlog.translations[0].content);
      expect(response.body.language).toBe(testBlog.translations[0].language);
      expect(response.body.tags).toEqual(expect.arrayContaining(testBlog.tags));
    });

    it('should return 404 if blog is not found', async () => {
      // Arrange
      const nonExistingId = 'd490f97f-b5ed-4e7b-adfb-ae5c718a5f57';

      // Act
      const response = await request(app.getHttpServer()).get(
        `/blogs/${nonExistingId}?language=${LanguagesEnum.EN}`
      );

      // Assert
      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });

    it('should return 400 if blog uuid is not valid, uuid validation pipe', async () => {
      // Arrange
      const invalidId = 'invalid-id';

      // Act
      const response = await request(app.getHttpServer()).get(
        `/blogs/${invalidId}?language=${LanguagesEnum.EN}`
      );

      // Assert
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('UPDATE /blogs/:id', () => {
    it('should update a specific blog by ID', async () => {
      // Arrange
      const testBlog = await blogRepository.save({ ...blogTest });

      const updateBlogData: UpdateBlogDto = { ...blogTest2 };

      // Act
      const response = await request(app.getHttpServer())
        .put(`/blogs/${testBlog.externalId}`)
        .send({ ...updateBlogData });

      // Assert
      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body.id).toBe(testBlog.externalId);
      expect(response.body.translations[0].title).toBe(
        updateBlogData.translations[0].title
      );
      expect(response.body.translations[0].content).toBe(
        updateBlogData.translations[0].content
      );
      expect(response.body.translations[0].language).toBe(
        updateBlogData.translations[0].language
      );
      expect(response.body.translations[1].title).toBe(
        updateBlogData.translations[1].title
      );
      expect(response.body.translations[1].content).toBe(
        updateBlogData.translations[1].content
      );
      expect(response.body.translations[1].language).toBe(
        updateBlogData.translations[1].language
      );
      expect(response.body.tags).toEqual(
        expect.arrayContaining(updateBlogData.tags)
      );
    });

    it('should add new language if didn"t exist', async () => {
      // Arrange
      const testBlog = await blogRepository.save({ ...blogTestEn });

      const updateBlogData: UpdateBlogDto = { ...blogTestCs };

      // Act
      const response = await request(app.getHttpServer())
        .put(`/blogs/${testBlog.externalId}`)
        .send({ ...updateBlogData });

      // Assert
      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body.id).toBe(testBlog.externalId);
      expect(response.body.translations.length).toBe(2);

      const translationCS = response.body.translations.find(
        (translation: BlogTranslationDto) =>
          translation.language === LanguagesEnum.CS
      );

      expect(translationCS).toEqual(updateBlogData.translations[0]);
    });

    it('should return 404 if blog is not found', async () => {
      // Arrange
      const nonExistingId = 'd490f97f-b5ed-4e7b-adfb-ae5c718a5f57';

      // Act
      const response = await request(app.getHttpServer())
        .put(`/blogs/${nonExistingId}`)
        .send({ ...blogTest });

      // Assert
      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });

    it('should return 400 if blog uuid is not valid, uuid validation pipe', async () => {
      // Arrange
      const invalidId = 'invalid-id';

      // Act
      const response = await request(app.getHttpServer())
        .put(`/blogs/${invalidId}`)
        .send({ ...blogTest });

      // Assert
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('DELETE /blogs/:id', () => {
    it('should delete a specific blog by ID', async () => {
      // Arrange
      const testBlog = await blogRepository.save({ ...blogTest });

      // Act
      const response = await request(app.getHttpServer()).delete(
        `/blogs/${testBlog.externalId}`
      );

      // Assert
      expect(response.status).toBe(HttpStatus.OK);
    });

    it('should return 404 if blog is not found', async () => {
      // Arrange
      const nonExistentId = 'd490f97f-b5ed-4e7b-adfb-ae5c718a5f57';

      // Act
      const response = await request(app.getHttpServer()).delete(
        `/blogs/${nonExistentId}`
      );

      // Assert
      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });

    it('should return 404 when deleting blog that had been deleted', async () => {
      // Arrange
      const testBlog = await blogRepository.save({ ...blogTest });

      // Act
      const response = await request(app.getHttpServer()).delete(
        `/blogs/${testBlog.externalId}`
      );

      // Assert
      expect(response.status).toBe(HttpStatus.OK);

      // Act
      const responseDeleteAgain = await request(app.getHttpServer()).delete(
        `/blogs/${testBlog.externalId}`
      );

      // Assert
      expect(responseDeleteAgain.status).toBe(HttpStatus.NOT_FOUND);
    });

    it('should return 400 if blog uuid is not valid, uuid validation pipe', async () => {
      // Arrange
      const invalidId = 'invalid-id';

      // Act
      const response = await request(app.getHttpServer()).delete(
        `/blogs/${invalidId}`
      );

      // Assert
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });
});
