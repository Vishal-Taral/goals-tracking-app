import { CategoryDto } from '../dto/categoryDto';
import {
  addCategoryService,
  getCategoryByIdService,
  listOfCategoryService,
  removeCategoryService,
  updateCategoryService,
} from '../services/catagoryService';

const getAllCategories = async (req, res) => {
  try {
    const category = await listOfCategoryService();
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'categories fetched successfully.',
      data: CategoryDto.toDto(category),
    });
  } catch (error) {
    throw new error();
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const findCategory = await getCategoryByIdService(categoryId);
    if (!findCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'Role found successfully.',
      data: new CategoryDto(findCategory),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addCategory = async (req, res) => {
  try {
    const addedCategory = await addCategoryService(req.body);
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'category added successfully.',
      data: new CategoryDto(addedCategory),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const findCategory = await updateCategoryService(categoryId, req?.body);
    if (!findCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'Category updated successfully.',
      data: new CategoryDto(findCategory),
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await removeCategoryService(categoryId);
    if (category.affected !== 0) {
      return res.json({
        statusCode: 200,
        status: 'success',
        message: 'Category deleted successfully.',
      });
    } else {
      return res.status(404).json({ error: 'Failed to delete Category' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
};
