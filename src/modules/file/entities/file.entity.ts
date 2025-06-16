import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Admin } from '../../admin/entities/admin.entity';

@Entity('files')
export class File extends BaseEntity {
  @Column()
  original_name: string;

  @Column()
  file_name: string;

  @Column()
  mime_type: string;

  @Column()
  size: number;

  @Column()
  path: string;

  @Column({ nullable: true })
  url: string;

  @Column({
    type: 'enum',
    enum: ['image', 'document', 'video', 'audio', 'other'],
    default: 'other',
  })
  type: 'image' | 'document' | 'video' | 'audio' | 'other';

  @Column({ nullable: true })
  width?: number;

  @Column({ nullable: true })
  height?: number;

  @Column({ nullable: true })
  duration?: number;

  @Column()
  uploaded_by: string;

  @ManyToOne(() => Admin)
  @JoinColumn({ name: 'uploaded_by' })
  uploader: Admin;

  @Column({ default: false })
  is_public: boolean;

  @Column({ nullable: true })
  alt_text?: string;

  @Column({ nullable: true })
  description?: string;
}
