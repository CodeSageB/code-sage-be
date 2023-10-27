import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable
} from 'typeorm';
import { BlogTranslationEntity } from './BlogTranslation.entity';
import { TagEntity } from './Tag.entity';

@Entity('Blog')
export class BlogEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  @Generated('uuid')
  externalId: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated: Date;

  @OneToMany(() => BlogTranslationEntity, (translation) => translation.blog, {
    eager: true,
    cascade: true
  })
  translations: BlogTranslationEntity[];

  @ManyToMany(() => TagEntity, (tag) => tag.blogs, {
    eager: true
  })
  @JoinTable()
  tags: TagEntity[];
}
