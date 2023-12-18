import express from 'express';
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
  getCategoryById,
} from '../controllers/categoryController';

const router = express.Router();

router.get('/categories', getAllCategories);

router.get('/category/:id', getCategoryById);

router.post('/addCategory', addCategory);

router.put('/updateCategory/:id', updateCategory);

router.delete('/deleteCategory/:id', deleteCategory);

export { router as CategoryRouter };
