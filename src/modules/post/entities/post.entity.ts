import { Entity, Column, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Category } from '../../category/entities/category.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('posts')
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ unique: true })
  slug: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({
    type: 'enum',
    enum: ['draft', 'published', 'deleted', 'private'],
    default: 'draft',
  })
  status: 'draft' | 'published' | 'deleted' | 'private';

  @Column({ nullable: true })
  published_at?: Date;

  @Column({ default: 0 })
  view_count: number;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  tags: Tag[];

  @Column({ nullable: true })
  category_id?: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category?: Category;

  @Column({ nullable: true })
  thumbnail_image?: string;

  @Column({ nullable: true, length: 160 })
  meta_description?: string;
}
