import { Module } from '@nestjs/common';
import { BlogsController } from './controllers/blogs/blogs.controller';
import { BlogsService } from './services/blogs/blogs.service';
import { BlogEntity } from '../typeorm/entities/Blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BlogEntity])],
  controllers: [BlogsController],
  providers: [BlogsService]
})
export class BlogsModule {}
