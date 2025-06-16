import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  avatar_url?: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: true })
  last_login?: Date;
}
