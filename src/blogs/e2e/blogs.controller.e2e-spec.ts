import { INestApplication } from '@nestjs/common';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from '../../typeorm/entities/Blog.entity';
import { BlogsController } from '../controllers/blogs/blogs.controller';
import * as request from 'supertest';
import { BlogsService } from '../services/blogs/blogs.service';
import { ConfigTestHelper } from '../../shared/test/config-test-helper';
// TODO dodělat testy
//TODO rozjet testy v CI/CD
describe('BlogsController (e2e)', () => {
  let app: INestApplication;
  let pgContainer: StartedTestContainer;

  beforeAll(async () => {
    pgContainer = await new GenericContainer('postgres')
      .withEnvironment(ConfigTestHelper.getTestEnvVariables)
      .withExposedPorts(ConfigTestHelper.getPort)
      .start();
  }, 60000);

  beforeEach(async () => {
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
    await app.init();
  });

  it('/blogs (GET)', () => {
    return request(app.getHttpServer())
      .post('/blogs/all')
      .expect(201)
      .expect([]);
  });
});
