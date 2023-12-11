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

const app = express();
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api', UserRouter);
app.use('/api', CategoryRouter);

const appDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'admin@123',
  database: 'GoalsOnTack',
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

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
