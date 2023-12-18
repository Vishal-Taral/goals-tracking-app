import express from 'express';
import {
  addUser,
  deleteUser,
  getAllUsers,
  updateUser,
  getUserById
} from '../controllers/userController';

const router = express.Router();

router.get('/users', getAllUsers);

router.get('/user/:id', getUserById);

router.post('/addUser', addUser);

router.put('/updateUser/:id', updateUser);

router.delete('/deleteUser/:id', deleteUser);

export { router as UserRouter };
