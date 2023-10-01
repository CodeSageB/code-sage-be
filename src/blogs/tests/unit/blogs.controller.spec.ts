import { Test, TestingModule } from '@nestjs/testing';
import { BlogsController } from '../../blogs.controller';
import { BlogsService } from '../../blogs.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BlogEntity } from '../../entities/Blog.entity';
import { DataSource, Repository } from 'typeorm';
import { BlogTranslationEntity } from '../../entities/BlogTranslation.entity';

describe('BlogsController', () => {
  let controller: BlogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogsService,
        {
          provide: getRepositoryToken(BlogEntity),
          useClass: Repository
        },
        {
          provide: getRepositoryToken(BlogTranslationEntity),
          useClass: Repository
        },
        {
          provide: DataSource,
          useValue: {}
        }
      ],
      controllers: [BlogsController]
    }).compile();

    controller = module.get<BlogsController>(BlogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
