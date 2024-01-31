import { SetStateAction, createContext } from 'react';

export interface AppContextProps {
  manage: string;
  setManage: React.Dispatch<SetStateAction<string>>;
  pageNumber: number;
  setPageNumber: React.Dispatch<SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<SetStateAction<number>>;
  sortOrder: string;
  setSortOrder: React.Dispatch<SetStateAction<string>>;
  sortBy: string;
  setSortBy: React.Dispatch<SetStateAction<string>>;
  sortByRole: string;
  setSortByRole: React.Dispatch<SetStateAction<string>>;
  sortOrderOfCategory: string;
  setSortOrderOfCategory: React.Dispatch<SetStateAction<string>>;
  firstNameSearch: string;
  setFirstNameSearch: React.Dispatch<SetStateAction<string>>;
  lastNameSearch: string;
  setLastNameSearch: React.Dispatch<SetStateAction<string>>;
  emailSearch: string;
  setEmailSearch: React.Dispatch<SetStateAction<string>>;
  roleNameSearch: string;
  setRoleNameSearch: React.Dispatch<SetStateAction<string>>;
  descriptionSearch: string;
  setDescriptionSearch: React.Dispatch<SetStateAction<string>>;
  categorySearch: string;
  setCategorySearch: React.Dispatch<SetStateAction<string>>;
}

const initialState: AppContextProps = {
  manage: '',
  setManage: () => {},
  pageNumber: 1,
  setPageNumber: () => {},
  pageSize: 1,
  setPageSize: () => {},
  sortOrder: 'asc',
  setSortOrder: () => {},
  sortBy: 'firstName',
  setSortBy: () => {},
  sortByRole: 'name',
  setSortByRole: () => {},
  sortOrderOfCategory: 'asc',
  setSortOrderOfCategory: () => {},
  firstNameSearch: '',
  setFirstNameSearch: () => {},
  lastNameSearch: '',
  setLastNameSearch: () => {},
  emailSearch: '',
  setEmailSearch: () => {},
  roleNameSearch: '',
  setRoleNameSearch: () => {},
  descriptionSearch: '',
  setDescriptionSearch: () => {},
  categorySearch: '',
  setCategorySearch: () => {},
};
const AppContext = createContext<AppContextProps | undefined>(initialState);

export default AppContext;
