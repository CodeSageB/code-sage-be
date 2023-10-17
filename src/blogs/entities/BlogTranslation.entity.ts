import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn
} from 'typeorm';
import { BlogEntity } from './Blog.entity';

@Entity('BlogTranslation')
export class BlogTranslationEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  language: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => BlogEntity, (blog) => blog.translations, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'blogId' })
  blog: BlogEntity;
}
