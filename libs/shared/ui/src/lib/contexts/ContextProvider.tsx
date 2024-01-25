import React, { useState } from 'react';
import AppContext from './AppContext';

const ContextProvider = (props: any) => {
  const [manage, setManage] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('firstName');
  const [sortOrderOfCategory, setSortOrderOfCategory] = useState('asc');
  // const [sortByOfCategory, setSortByOfCategory] = useState('firstName');

  return (
    <AppContext.Provider
      value={{
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
        sortOrderOfCategory,
        setSortOrderOfCategory
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
