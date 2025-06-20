import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Post } from '../../post/entities/post.entity';
import { User } from '../../user/entities/user.entity';
@Entity('comments')
export class Comment extends BaseEntity {
  @Column('text')
  content: string;

  @Column()
  author_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column({ nullable: true })
  parent_id?: string;

  @ManyToOne(() => Comment)
  @JoinColumn({ name: 'parent_id' })
  parent?: Comment;

  @Column({ default: false })
  is_edited: boolean;

  @Column({ nullable: true })
  edited_at?: Date;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ nullable: true })
  deleted_at?: Date;
}
