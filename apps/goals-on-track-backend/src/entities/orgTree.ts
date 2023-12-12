import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';

@Entity()
export class OrgTree extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'reportee_id' })
  reporteeId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'manager_id' })
  manager: User;

  @Column('timestamp', {
    name: 'created_at',
    nullable: true,
    // default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column('timestamp', {
    name: 'updated_at',
    nullable: true,

    // default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ name: 'updated_by' })
  updatedBy: string;
}
