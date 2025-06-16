import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('admins')
export class Admin extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ['super_admin', 'admin', 'editor'],
    default: 'editor',
  })
  role: 'super_admin' | 'admin' | 'editor';

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: true })
  last_login?: Date;

  @Column({ nullable: true })
  avatar_url?: string;
}
