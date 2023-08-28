import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { BlogEntity } from './entities/Blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BlogEntity])],
  controllers: [BlogsController],
  providers: [BlogsService]
})
export class BlogsModule {}
