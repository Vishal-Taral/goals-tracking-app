import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'role_id' })
  roleId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('timestamp', {
    name: 'created_at',
    nullable: true,
  })
  createdAt: Date;

  @Column({ name: 'created_by', nullable: true })
  createdBy: string;

  @Column('timestamp', {
    name: 'updated_at',
    nullable: true,
  })
  updatedAt: Date;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy: string;
}
