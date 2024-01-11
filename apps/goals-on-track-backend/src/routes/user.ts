import express from 'express';
import {
  addUser,
  deleteUser,
  getAllUsers,
  updateUser,
  getUserById,
} from '../controllers/userController';
import { userAuthentication } from '../middleware/userAuthentication';

const router = express.Router();

router.get('/users', userAuthentication, getAllUsers);

router.get('/user/:id', userAuthentication, getUserById);

router.post('/addUser', userAuthentication, addUser);

router.put('/updateUser/:id', userAuthentication, updateUser);

router.delete('/deleteUser/:id', userAuthentication, deleteUser);

export { router as UserRouter };
