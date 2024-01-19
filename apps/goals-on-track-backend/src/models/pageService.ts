import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { GenericFilter, SortOrder } from './genricClass';

export class PageService {
  static createOrderQuery(filter: GenericFilter) {
    const order: any = {};

    if (filter.orderBy) {
      order[filter.orderBy] = filter.sortOrder;
      return order;
    }

    order.createdAt = SortOrder.DESC;
    return order;
  }

  static paginate<T>(
    repository: Repository<T>,
    filter: GenericFilter,
    where: FindOptionsWhere<T>
  ) {
    return repository.findAndCount({
      order: this.createOrderQuery(filter),
      skip: (filter.page - 1) * filter.pageSize,
      take: filter.pageSize,
      where: where,
    });
  }
}

export interface SearchUserQueryInterface {
  firstName: string;
  lastName: string;
  email: string;
}

export interface SearchRoleQueryInterface {
  roleName: string;
  roleDescription: string;
}

export interface CategoryQueryInterface {
  categoryName: string;
}

export class SearchUser extends PageService {
  static createWhereQuery(params: SearchUserQueryInterface) {
    const { firstName, lastName, email } = params;
    const where: any = {};

    if (firstName) {
      where.firstName = ILike(`%${firstName}%`);
    }

    if (lastName) {
      where.lastName = ILike(`%${lastName}%`);
    }

    if (email) {
      where.email = ILike(`%${email}%`);
    }

    return where;
  }
}

export class SearchRole extends PageService {
  static createWhereQuery(params: SearchRoleQueryInterface) {
    const { roleName, roleDescription } = params;
    const where: any = {};

    if (roleName) {
      where.roleName = ILike(`%${roleName}%`);
    }

    if (roleDescription) {
      where.roleDescription = ILike(`%${roleDescription}%`);
    }

    return where;
  }
}

export class SearchCategory extends PageService {
  static createWhereQuery(params: CategoryQueryInterface) {
    const { categoryName } = params;
    const where: any = {};

    if (categoryName) {
      where.categoryName = ILike(`%${categoryName}%`);
    }

    return where;
  }
}
