import { useState } from 'react';
import AppContext from './AppContext';

const ContextProvider = (props: any) => {
  // const [pathName, setpathName] = useState('');
  // const router = useRouter();
  // useLayoutEffect(() => {
  //   if (router.pathname.split('/')[3] == 'roles') {
  //     setpathName('name');
  //   } else if (router.pathname.split('/')[3] == 'users') {
  //     setpathName('firstName');
  //   }
  // }, []);
  const [manage, setManage] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('firstName');
  const [sortByRole, setSortByRole] = useState('name');
  const [firstNameSearch, setFirstNameSearch] = useState('');
  const [lastNameSearch, setLastNameSearch] = useState('');
  const [emailSearch, setEmailSearch] = useState('');
  const [roleNameSearch , setRoleNameSearch] = useState('');
  const [descriptionSearch , setDescriptionSearch] = useState('');
  const [categorySearch , setCategorySearch] = useState('');

  // console.log('in context component','sortBy',sortBy)
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
        setCategorySearch
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
