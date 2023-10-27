import { Test, TestingModule } from '@nestjs/testing';
import { BlogsService } from '../../blogs.service';
import { DataSource, Repository } from 'typeorm';
import { BlogEntity } from '../../entities/Blog.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BlogTranslationEntity } from '../../entities/BlogTranslation.entity';
import { TagEntity } from '../../entities/Tag.entity';

describe('BlogsService', () => {
  let service: BlogsService;

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
          provide: getRepositoryToken(TagEntity),
          useClass: Repository
        },
        {
          provide: DataSource,
          useValue: {}
        }
      ]
    }).compile();

    service = module.get<BlogsService>(BlogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
