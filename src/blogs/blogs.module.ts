import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { BlogEntity } from './entities/Blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogTranslationEntity } from './entities/BlogTranslation.entity';
import { TagEntity } from './entities/Tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogEntity, BlogTranslationEntity, TagEntity])
  ],
  controllers: [BlogsController],
  providers: [BlogsService]
})
export class BlogsModule {}
