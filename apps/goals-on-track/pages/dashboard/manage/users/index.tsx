import React, { useContext, useState } from 'react';
import { ErrorHandler, FilterContainer, ManageUsers } from '@goal-tracker/ui';
import styles from './index.module.scss';
import { useGetUsers } from '@goal-tracker/data-access';
// eslint-disable-next-line @nx/enforce-module-boundaries
import PrivateLayout from 'apps/goals-on-track/component/common/privateLayout/private-layout';
// eslint-disable-next-line @nx/enforce-module-boundaries
import AppContext from 'libs/shared/ui/src/lib/contexts/AppContext';

/* eslint-disable-next-line */
export interface UsersProps {}

export function Users(props: UsersProps) {
  const { data: usersList } = useGetUsers();
  const context = useContext(AppContext);
  const [searchFirstName, setSearchFirstName] = useState('');
  const [searchLastName, setSearchLastName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');

  const handleSearch = () => {
    context?.setFirstNameSearch(searchFirstName);
    context?.setLastNameSearch(searchLastName);
    context?.setEmailSearch(searchEmail);
  };

  const users: any = {
    headings: [
      'Id',
      'First Name',
      'Last Name',
      'Gender',
      'Email',
      'Mobile No.',
      'Role',
      'update',
      'Delete',
    ],
    rows: usersList,
  };

  const inputDataForSearchField = [
    {
      value: 'firstName',
      label: 'First Name',
      setSearch: setSearchFirstName,
    },
    {
      value: 'lastName',
      label: 'Last Name',
      setSearch: setSearchLastName,
    },
    {
      value: 'email',
      label: 'Email',
      setSearch: setSearchEmail,
    },
  ];

  return (
    <div className={styles.container}>
      <PrivateLayout>
        <div className={styles.dashboard_page_container}>
          <div className={styles.header_and_user_detail_section}>
            <FilterContainer
              inputDataForSearchField={inputDataForSearchField}
              onSearch={handleSearch}
            />
            <ErrorHandler>
              <ManageUsers tableData={users} />
            </ErrorHandler>
          </div>
        </div>
      </PrivateLayout>
    </div>
  );
}

export default Users;
