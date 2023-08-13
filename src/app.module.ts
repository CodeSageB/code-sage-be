import { Module } from '@nestjs/common';
import { BlogsModule } from './blogs/blogs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './typeorm/entities/Blog.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      database: 'postgres',
      username: 'postgres',
      password: 'postgres',
      entities: [BlogEntity],
      synchronize: true,
      logging: true
    }),
    BlogsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
