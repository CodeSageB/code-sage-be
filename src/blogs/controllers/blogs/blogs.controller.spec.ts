import { Test, TestingModule } from '@nestjs/testing';
import { BlogsController } from './blogs.controller';
import { BlogsService } from '../../services/blogs/blogs.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BlogEntity } from '../../../typeorm/entities/Blog.entity';
import { Repository } from 'typeorm';

describe('BlogsController', () => {
  let controller: BlogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogsService,
        {
          provide: getRepositoryToken(BlogEntity),
          useClass: Repository
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
