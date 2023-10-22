import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BlogEntity } from './Blog.entity';

@Entity('Tag')
export class TagEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    unique: true
  })
  tag: string;

  @ManyToMany(() => BlogEntity, (blog) => blog.tags)
  blogs: BlogEntity[];
}
