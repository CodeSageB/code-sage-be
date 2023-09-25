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

@Entity('Blog')
export class BlogEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  @Generated('uuid')
  externalId: string;

  @Column('text', { array: true })
  tags: string[];

  @CreateDateColumn({ type: 'timestamptz' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated: Date;

  @OneToMany(() => BlogTranslationEntity, (translation) => translation.blog, {
    eager: true
  })
  translations: BlogTranslationEntity[];
}
