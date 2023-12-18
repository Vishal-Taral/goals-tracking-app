import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Role } from './role';
import { OrgTree } from './orgTree';

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

  @ManyToOne(() => Role, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  // @OneToMany(() => OrgTree, (OrgTree) => OrgTree.user, { eager: true })
  // @JoinColumn({ name: 'user_id' })
  // reportee: OrgTree;

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
