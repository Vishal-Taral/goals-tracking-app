import express from 'express';
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
  getCategoryById,
} from '../controllers/categoryController';
import { userAuthentication } from '../middleware/userAuthentication';

const router = express.Router();

router.get('/categories', userAuthentication, getAllCategories);

router.get('/category/:id', userAuthentication, getCategoryById);

router.post('/addCategory', userAuthentication, addCategory);

router.put('/updateCategory/:id', userAuthentication, updateCategory);

router.delete('/deleteCategory/:id', userAuthentication, deleteCategory);

export { router as CategoryRouter };
