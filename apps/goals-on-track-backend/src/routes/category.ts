import express from 'express';
import { Category } from '../entities/category';

const router = express.Router();

router.get('/categories', async (req, res) => {
  try {
    const category = await Category.find();
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'categories fetched successfully.',
      data: category,
    });
  } catch (error) {
    throw new error();
  }
});

router.post('/addCategory', async (req, res) => {
  try {
    const { categoryName } = req.body;
    const newCategory = Category.create({
      name: categoryName,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'Admin',
      updatedBy: 'Admin',
    });
    const addedCategory = await Category.save(newCategory);
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'category added successfully.',
      data: addedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/updateCategory/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { categoryName } = req.body;
    const findCategory = await Category.findOne({ where: { categoryId } });
    if (!findCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    (findCategory.name = categoryName),
      (findCategory.createdAt = new Date()),
      (findCategory.updatedAt = new Date()),
      (findCategory.createdBy = 'Admin'),
      (findCategory.updatedBy = 'Admin');

    const updateCategory = await Category.save(findCategory);

    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'Category updated successfully.',
      data: updateCategory,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/deleteCategory/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findOne({ where: { categoryId } });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const deleteCategory = await Category.delete(categoryId);
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'Category deleted successfully.',
      data: category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { router as CategoryRouter };
