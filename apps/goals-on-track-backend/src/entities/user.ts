import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  mobile_number: string;

  @Column()
  gender: 'Male' | 'Female';

  @ManyToOne(() => Role, { lazy: true })
  @JoinColumn({ name: 'role_id' })
  role: Promise<Role>;

  // @OneToMany(() => OrgTree, (OrgTree) => OrgTree.user, { eager: true })
  // @JoinColumn({ name: 'user_id' })
  // reportee: OrgTree;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'created_by' })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'updated_by' })
  updatedBy: string;
}
