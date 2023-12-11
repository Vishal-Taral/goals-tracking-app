import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'category_id' })
  categoryId: string;

  @Column({ name: 'category_name' })
  name: string;

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
