export interface AddRoleInput {
    roleName: string,
    roleDescription: string
}

export interface QueryParamsObj {
    page: number;
    pageSize: number;
    sortBy: 'firstName' | 'lastName' ;
    sortOrder: 'asc'|'desc';
}

export interface InterfaceForContext {
    manage: string;
    setManage : () => void;
    queryParamsObj : any;
    setQueryParamsObj : () => void;
}

export interface SortByObj {
    label: string;
    name: string;
    value: string;
  }