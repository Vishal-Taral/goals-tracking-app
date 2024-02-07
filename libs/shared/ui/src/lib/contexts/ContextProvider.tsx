import { useState } from 'react';
import AppContext, { AppContextProps } from './AppContext';

const ContextProvider = (props: any) => {
  const [manage, setManage] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('firstName');
  const [sortByRole, setSortByRole] = useState('name');
  const [firstNameSearch, setFirstNameSearch] = useState('');
  const [lastNameSearch, setLastNameSearch] = useState('');
  const [emailSearch, setEmailSearch] = useState('');
  const [roleNameSearch, setRoleNameSearch] = useState('');
  const [descriptionSearch, setDescriptionSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [sortOrderOfCategory, setSortOrderOfCategory] = useState('asc');

  const contextValues: AppContextProps = {
    manage,
    setManage,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    sortOrder,
    setSortOrder,
    sortBy,
    setSortBy,
    sortByRole,
    setSortByRole,
    sortOrderOfCategory,
    setSortOrderOfCategory,
    firstNameSearch,
    setFirstNameSearch,
    lastNameSearch,
    setLastNameSearch,
    emailSearch,
    setEmailSearch,
    roleNameSearch,
    setRoleNameSearch,
    descriptionSearch,
    setDescriptionSearch,
    categorySearch,
    setCategorySearch,
  };

  return (
    <AppContext.Provider value={contextValues}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
