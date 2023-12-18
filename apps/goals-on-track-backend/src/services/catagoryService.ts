import { Category } from '../entities/category';

const removeCategoryService = async (categoryId: string) => {
  try {
    const deleteCategory = await Category.delete(categoryId);
    return deleteCategory;
  } catch (error) {
    console.log(error);
  }
};

const addCategoryService = async (body) => {
  try {
    const { categoryName } = body;

    const newCategory = Category.create({
      name: categoryName,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'Admin',
      updatedBy: 'Admin',
    });
    const addedCategory = await Category.save(newCategory);
    return addedCategory;
  } catch (error) {
    console.log(error);
  }
};

const getCategoryByIdService = async (categoryId: string) => {
  try {
    const existingCategory = await Category.findOne({ where: { categoryId } });
    return existingCategory;
  } catch (error) {
    console.log(error);
  }
};

const listOfCategoryService = async () => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (error) {
    console.log(error);
  }
};

const updateCategoryService = async (categoryId, body) => {
  try {
    const { categoryName } = body;
    const findCategory = await Category.findOne({ where: { categoryId } });
    (findCategory.name = categoryName),
      (findCategory.createdAt = new Date()),
      (findCategory.updatedAt = new Date()),
      (findCategory.createdBy = 'Admin'),
      (findCategory.updatedBy = 'Admin');

    const updateCategory = await Category.save(findCategory);

    return updateCategory;
  } catch (error) {
    console.log(error);
  }
};

export {
  removeCategoryService,
  addCategoryService,
  getCategoryByIdService,
  listOfCategoryService,
  updateCategoryService,
};
