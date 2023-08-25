import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from '../../typeorm/entities/Blog.entity';
import { BlogsController } from '../controllers/blogs/blogs.controller';
import * as request from 'supertest';
import { BlogsService } from '../services/blogs/blogs.service';
import { ConfigTestHelper } from '../../shared/test/config-test-helper';
import { Repository } from 'typeorm';
import { CreateBlogDto } from '../dtos/createBlog.dto';
import { UpdateBlogDto } from '../dtos/updateBlog.dto';
import { PaginationDto } from '../dtos/pagination.dto';

describe('BlogsController (e2e)', () => {
  let app: INestApplication;
  let pgContainer: StartedTestContainer;
  let blogRepository: Repository<BlogEntity>;

  const seedDatabase = async function (data: CreateBlogDto[]) {
    const entities = data.map((blog) => blogRepository.create(blog));
    await blogRepository.save(entities);
  };

  const testData: CreateBlogDto[] = [
    {
      title: 'test title 1',
      content: 'test content 1'
    },
    {
      title: 'test title 2',
      content: 'test content 2'
    },
    {
      title: 'test title 3',
      content: 'test content 3'
    },
    {
      title: 'test title 4',
      content: 'test content 4'
    },
    {
      title: 'test title 5',
      content: 'test content 5'
    },
    {
      title: 'test title 6',
      content: 'test content 6'
    },
    {
      title: 'test title 7',
      content: 'test content 7'
    },
    {
      title: 'test title 8',
      content: 'test content 8'
    },
    {
      title: 'test title 9',
      content: 'test content 9'
    },
    {
      title: 'test title 10',
      content: 'test content 10'
    },
    {
      title: 'test title 11',
      content: 'test content 11'
    }
  ];

  beforeAll(async () => {
    pgContainer = await new GenericContainer('postgres')
      .withEnvironment(ConfigTestHelper.getTestEnvVariables)
      .withExposedPorts(ConfigTestHelper.getPort)
      .start();

    const moduleFixture = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          ...ConfigTestHelper.prepareTypeOrmOptions(pgContainer),
          entities: [BlogEntity]
        }),
        TypeOrmModule.forFeature([BlogEntity])
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
  }, 60000);

  afterEach(async () => {
    await blogRepository.clear();
  });

  afterAll(async () => {
    await pgContainer.stop();
    await app.close();
    // await blogRepository.clear();
  });

  describe('POST /blogs', () => {
    it('should create a new blog', async () => {
      const createBlogDto: CreateBlogDto = {
        title: 'Test Title',
        content: 'Test Content'
      };

      const response = await request(app.getHttpServer())
        .post('/blogs')
        .send({ ...createBlogDto });

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body.title).toBe(createBlogDto.title);
      expect(response.body.content).toBe(createBlogDto.content);
    });

    it('should return 400 if blog data is not valid', async () => {
      const createBlogDto: CreateBlogDto = {
        title: '',
        content: 'Test Content'
      };

      const response = await request(app.getHttpServer())
        .post('/blogs')
        .send(createBlogDto);

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('POST /blogs/all', () => {
    it('should return 10 blogs by default', async () => {
      await seedDatabase(testData);

      const response = await request(app.getHttpServer()).post('/blogs/all');

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body.length).toBe(10);
    });

    it('should return blogs according to pagination', async () => {
      await seedDatabase(testData);

      const pagination: PaginationDto = {
        take: 5
      };

      const response = await request(app.getHttpServer())
        .post('/blogs/all')
        .send(pagination);

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body.length).toBe(pagination.take);
    });

    it('should return empty array if no blogs', async () => {
      const response = await request(app.getHttpServer()).post('/blogs/all');

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body.length).toBe(0);
    });
  });

  describe('GET /blogs/:id', () => {
    it('should return a specific blog by ID', async () => {
      const testBlog = await blogRepository.save({
        title: 'Test Title',
        content: 'Test Content'
      });

      const response = await request(app.getHttpServer()).get(
        `/blogs/${testBlog.externalId}`
      );

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body.title).toBe(testBlog.title);
      expect(response.body.content).toBe(testBlog.content);
    });

    it('should return 404 if blog is not found', async () => {
      const nonExistentId = 'd490f97f-b5ed-4e7b-adfb-ae5c718a5f57';

      const response = await request(app.getHttpServer()).get(
        `/blogs/${nonExistentId}`
      );

      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });

    it('should return 400 if blog uuid is not valid, uuid validation pipe', async () => {
      const invalidId = 'invalid-id';

      const response = await request(app.getHttpServer()).get(
        `/blogs/${invalidId}`
      );

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('UPDATE /blogs/:id', () => {
    it('should update a specific blog by ID', async () => {
      const testBlog = await blogRepository.save({
        title: 'Test Title',
        content: 'Test Content'
      });

      const updateBlogData: UpdateBlogDto = {
        title: 'Updated Title',
        content: 'Updated Content'
      };

      const response = await request(app.getHttpServer())
        .put(`/blogs/${testBlog.externalId}`)
        .send({ ...updateBlogData });

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body.title).toBe(updateBlogData.title);
      expect(response.body.content).toBe(updateBlogData.content);

      const updateBlogTitle: UpdateBlogDto = {
        title: 'Updated Title 2'
      };

      const responseWithUpdatedTitle = await request(app.getHttpServer())
        .put(`/blogs/${testBlog.externalId}`)
        .send({ ...updateBlogTitle });

      expect(response.status).toBe(HttpStatus.OK);
      expect(responseWithUpdatedTitle.body.title).toBe(updateBlogTitle.title);
      expect(responseWithUpdatedTitle.body.content).toBe(
        updateBlogData.content
      );
    });

    it('should return 404 if blog is not found', async () => {
      const nonExistentId = 'd490f97f-b5ed-4e7b-adfb-ae5c718a5f57';

      const response = await request(app.getHttpServer())
        .put(`/blogs/${nonExistentId}`)
        .send({
          title: 'Updated Title',
          content: 'Updated Content'
        });

      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });

    it('should return 400 if blog uuid is not valid, uuid validation pipe', async () => {
      const invalidId = 'invalid-id';

      const response = await request(app.getHttpServer())
        .put(`/blogs/${invalidId}`)
        .send({
          title: 'Updated Title',
          content: 'Updated Content'
        });

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('DELETE /blogs/:id', () => {
    it('should delete a specific blog by ID', async () => {
      const testBlog = await blogRepository.save({
        title: 'Test Title',
        content: 'Test Content'
      });

      const response = await request(app.getHttpServer()).delete(
        `/blogs/${testBlog.externalId}`
      );

      expect(response.status).toBe(HttpStatus.OK);
    });

    it('should return 404 if blog is not found', async () => {
      const nonExistentId = 'd490f97f-b5ed-4e7b-adfb-ae5c718a5f57';

      const response = await request(app.getHttpServer()).delete(
        `/blogs/${nonExistentId}`
      );

      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });

    it('should return 404 when deleting blog that had been deleted', async () => {
      const testBlog = await blogRepository.save({
        title: 'Test Title',
        content: 'Test Content'
      });

      const response = await request(app.getHttpServer()).delete(
        `/blogs/${testBlog.externalId}`
      );

      expect(response.status).toBe(HttpStatus.OK);

      const responseDeleteAgain = await request(app.getHttpServer()).delete(
        `/blogs/${testBlog.externalId}`
      );

      expect(responseDeleteAgain.status).toBe(HttpStatus.NOT_FOUND);
    });

    it('should return 400 if blog uuid is not valid, uuid validation pipe', async () => {
      const invalidId = 'invalid-id';

      const response = await request(app.getHttpServer()).delete(
        `/blogs/${invalidId}`
      );

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });
});
