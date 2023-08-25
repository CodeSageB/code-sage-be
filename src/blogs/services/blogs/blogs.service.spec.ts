import { Test, TestingModule } from '@nestjs/testing';
import { BlogsService } from './blogs.service';
import { Repository } from 'typeorm';
import { BlogEntity } from '../../../typeorm/entities/Blog.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BlogsService', () => {
  let service: BlogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogsService,
        {
          provide: getRepositoryToken(BlogEntity),
          useClass: Repository
        }
      ]
    }).compile();

    service = module.get<BlogsService>(BlogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
