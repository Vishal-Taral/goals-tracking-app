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
