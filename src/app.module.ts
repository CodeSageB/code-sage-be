import { Module } from '@nestjs/common';
import { BlogsModule } from './blogs/blogs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './typeorm/entities/Blog.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'noveHeslo1',
      username: 'code-sage-admin',
      entities: [BlogEntity],
      database: 'codeSage',
      synchronize: true,
      logging: true
    }),
    BlogsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
