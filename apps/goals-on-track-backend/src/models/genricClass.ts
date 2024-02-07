import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export enum SortOrder {
  DESC = 'desc',
  ASC = 'asc',
}

export class GenericFilter {
  @IsNumber({}, { message: 'page should be a number' })
  @IsInt({ message: 'page should be an integer' })
  @IsPositive({ message: 'page should be greater than 0' })
  public page?: number;

  @IsNumber({}, { message: 'pageSize should be a number' })
  @IsInt({ message: 'pageSize should be an integer' })
  @IsPositive({ message: 'pageSize should be greater than 0' })
  public pageSize?: number;

  @IsOptional()
  public orderBy?: string;

  @IsEnum(SortOrder, {
    message: 'sortOrder should be either "desc" or "asc"',
  })
  @IsOptional()
  public sortOrder?: SortOrder = SortOrder.DESC;
}

export class UserQuery extends GenericFilter {
  @IsOptional()
  @IsString({ message: 'firstName should be a string' })
  public firstName: string;

  @IsOptional()
  @IsString({ message: 'lastName should be a string' })
  public lastName: string;

  @IsOptional()
  @IsEmail({}, { message: 'firstName should be a number' })
  public email: string;

  constructor(userQuery: any) {
    super();
    (this.email = userQuery.email),
      (this.firstName = userQuery.firstName),
      (this.lastName = userQuery.lastName),
      (this.orderBy = userQuery.sortBy),
      (this.page = parseInt(userQuery.page)),
      (this.pageSize = parseInt(userQuery.pageSize)),
      (this.sortOrder = userQuery.sortOrder);
  }
}

export class RoleQuery extends GenericFilter {
  @IsOptional()
  @IsString({ message: 'name must be a string' })
  public name: string;

  @IsOptional()
  @IsString({ message: 'description must be a string' })
  public description: string;

  constructor(roleQuery: any) {
    super();
    (this.orderBy = roleQuery.sortBy),
      (this.page = parseInt(roleQuery.page)),
      (this.pageSize = parseInt(roleQuery.pageSize)),
      (this.sortOrder = roleQuery.sortOrder),
      (this.name = roleQuery.roleName),
      (this.description = roleQuery.roleDescription);
  }
}

export class CategoryQuery extends GenericFilter {
  @IsOptional()
  @IsString({ message: 'Category must be a string' })
  public name: string;

  constructor(categoryQuery: any) {
    super();
    (this.orderBy = categoryQuery.sortBy),
      (this.page = parseInt(categoryQuery.page)),
      (this.pageSize = parseInt(categoryQuery.pageSize)),
      (this.sortOrder = categoryQuery.sortOrder),
      (this.name = categoryQuery.categoryName);
  }
}

export class GoalQuery extends GenericFilter {
  @IsOptional()
  @IsString({ message: 'Goal name must be a string' })
  public name: string;

  @IsOptional()
  @IsString({ message: 'Goal description must be a string' })
  public description: string;

  @IsOptional()
  @IsString({ message: 'Goal status must be a string' })
  public status: string;

  @IsOptional()
  @IsString({ message: 'User must be a string' })
  public user: string;

  @IsOptional()
  @IsString({ message: 'Goal Category must be a id of category' })
  public category: string;

  constructor(goalQuery: any) {
    super();
    (this.page = parseInt(goalQuery.page)),
      (this.pageSize = parseInt(goalQuery.pageSize)),
      (this.sortOrder = goalQuery.sortOrder),
      (this.orderBy = goalQuery.sortBy),
      (this.name = goalQuery.goalTitle),
      (this.description = goalQuery.goalDescription),
      (this.user = goalQuery.user),
      (this.status = goalQuery.status),
      (this.category = goalQuery.categoryName);
  }
}
