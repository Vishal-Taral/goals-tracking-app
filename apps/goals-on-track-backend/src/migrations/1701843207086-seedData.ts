import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedData1701843207086 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const time = new Date();
    const defaultUser = 'System';

    // Seed data for Role entity if it does not exist
    const adminRoleExists = await queryRunner.query(
      'SELECT * FROM role WHERE role_id = ?',
      ['roleIdAdmin']
    );

    if (!adminRoleExists.length) {
      await queryRunner.query(
        'INSERT INTO role (role_id, name, description, created_at, created_by, updated_at, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          'roleIdAdmin',
          'Admin',
          'Administrator Role',
          time,
          defaultUser,
          time,
          defaultUser,
        ]
      );
    }

    // Seed data for Category entity if it does not exist
    const sampleCategoryExists = await queryRunner.query(
      'SELECT * FROM category WHERE category_id = ?',
      ['categoryId1']
    );

    if (!sampleCategoryExists.length) {
      await queryRunner.query(
        'INSERT INTO category (category_id, category_name, created_at, created_by, updated_at, updated_by) VALUES (?, ?, ?, ?, ?, ?)',
        ['categoryId1', 'Employees', time, defaultUser, time, defaultUser]
      );
    }

    // Seed data for User entity if it does not exist
    const adminUserExists = await queryRunner.query(
      'SELECT * FROM user WHERE user_id = ?',
      ['userId1']
    );

    if (!adminUserExists.length) {
      await queryRunner.query(
        'INSERT INTO user (user_id, first_name, last_name, email, password, mobile_number, gender, role_id, created_at, created_by, updated_at, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          'userId1',
          'Hrishikesh',
          'Gore',
          'hrishikesh.gore@polyglots.io',
          'admin@1494',
          '9158551076',
          'Male',
          'roleIdAdmin', // Use the actual role ID here
          time,
          defaultUser,
          time,
          defaultUser,
        ]
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM user WHERE user_id = ?', ['userId1']);
    await queryRunner.query('DELETE FROM category WHERE category_id = ?', [
      'categoryId1',
    ]);
    await queryRunner.query('DELETE FROM role WHERE role_id = ?', [
      'roleIdAdmin',
    ]);

    // Add other delete statements for additional seeded data if needed
  }
}
