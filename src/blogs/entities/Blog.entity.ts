import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
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
    eager: true
  })
  translations: BlogTranslationEntity[];

  @OneToMany(() => TagEntity, (tag) => tag.blog, {
    eager: true
  })
  tags: TagEntity[];
}
