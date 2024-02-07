import { Category } from '../entities/category';

class CategoryDto {
  categoryId: string;
  name: string;

  constructor(category) {
    (this.categoryId = category.categoryId), (this.name = category.name);
  }
  public static toDto(categories: Category[]) {
    const listOfcategory = categories.map((category) => {
      return new CategoryDto(category);
    });
    return listOfcategory;
  }
}

export { CategoryDto };
