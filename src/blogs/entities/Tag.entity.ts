import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BlogEntity } from './Blog.entity';

@Entity('Tag')
export class TagEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  tag: string;

  @ManyToOne(() => BlogEntity, (blog) => blog.tags, {
    onDelete: 'CASCADE'
  })
  blog: BlogEntity;
}
