import express from 'express';
import * as path from 'path';
import { DataSource } from 'typeorm';
import { User } from './entities/user';
import { Role } from './entities/role';
import { Category } from './entities/category';
import { Goal } from './entities/goal';
import { OrgTree } from './entities/orgTree';
import { SeedData1701843207086 } from './migrations/1701843207086-seedData';
import { UserRouter } from './routes/user';
import { CategoryRouter } from './routes/category';
import { RoleRouter } from './routes/role';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api', UserRouter);
app.use('/api', CategoryRouter);
app.use('/api', RoleRouter);


const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'got',
  entities: [User, Role, Category, Goal, OrgTree],
  migrations: [SeedData1701843207086],
  migrationsRun: true,
  synchronize: false,
  logging: true,
});

appDataSource
  .initialize()
  .then(() => {
    console.log('mySql connected');
  })
  .catch((error) => console.log(error));

export default app;
