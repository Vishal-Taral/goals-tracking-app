import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Role } from './role';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  userId: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({})
  email: string;

  @Column()
  password: string;

  @Column()
  mobile_number: string;

  @Column()
  gender: 'Male' | 'Female';

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

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
