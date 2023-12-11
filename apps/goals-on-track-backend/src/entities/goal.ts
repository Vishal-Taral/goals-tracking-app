import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';
import { Category } from './category';

@Entity()
export class Goal extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'goal_id' })
  goalId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: User;

  @Column()
  status: string;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column('timestamp', {
    name: 'created_at',
  })
  createdAt: Date;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column('timestamp', {
    name: 'updated_at',
  })
  updatedAt: Date;

  @Column({ name: 'updated_by' })
  updatedBy: string;
}
