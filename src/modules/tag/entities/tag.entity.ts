import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Post } from '../../post/entities/post.entity';

@Entity('tags')
export class Tag extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => Post, (post) => post.tags)
  @JoinTable({
    name: 'post_tags',
    joinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'post_id',
      referencedColumnName: 'id',
    },
  })
  posts: Post[];
}
