import { validate } from 'class-validator';
import { CategoryDto } from '../dto/categoryDto';
import { CategoryQuery } from '../models/genricClass';
import {
  addCategoryService,
  getCategoryByIdService,
  listOfCategoryService,
  removeCategoryService,
  updateCategoryService,
} from '../services/catagoryService';
import invalidParameters from '../utils/invalidParams';
import { Request, Response } from 'express';

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const expectedParams = [
      'page',
      'pageSize',
      'categoryName',
      'sortBy',
      'sortOrder',
    ];
    const invalidQuery = invalidParameters(req, expectedParams);
    if (!invalidQuery?.isValid) {
      return res.status(400).json({ error: 'Bad request' });
    }
    const categoryQuery = new CategoryQuery(req.query);
    const validationErrors = await validate(categoryQuery, {
      validationError: { target: false },
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    if (validationErrors?.length > 0) {
      return res
        .status(400)
        .json({ error: 'Validation Error', details: validationErrors });
    }
    const { categories, categoryCount } = await listOfCategoryService(
      categoryQuery
    );
    const totalPages = Math.ceil(categoryCount / categoryQuery.pageSize);
    return res.json({
      statusCode: 200,
      status: 'success',
      message: categoryCount
        ? 'category list fetched successfully.'
        : 'no category is found',
      totalCount: categoryCount,
      totalPages,
      currentPage: categoryQuery.page,
      data: CategoryDto.toDto(categories),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const findCategory = await getCategoryByIdService(categoryId);
    if (!findCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'Category found successfully.',
      data: new CategoryDto(findCategory),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addCategory = async (req: Request, res: Response) => {
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

const updateCategory = async (req: Request, res: Response) => {
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

const deleteCategory = async (req: Request, res: Response) => {
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
