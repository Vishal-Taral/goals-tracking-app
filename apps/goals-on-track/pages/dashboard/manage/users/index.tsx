import React, { useContext } from 'react';
import { ErrorHandler, FilterContainer } from '@goal-tracker/ui';
import styles from './index.module.scss';
import { useGetUsers } from '@goal-tracker/data-access';
import PrivateLayout from 'apps/goals-on-track/component/common/privateLayout/private-layout';
import HOCAuth from 'libs/shared/ui/src/lib/components/HOCAuth/HOCAuth';
import { ManageUsers } from 'libs/shared/ui/src/lib/components/manageUsers/ManageUsers';
import AppContext from 'libs/shared/ui/src/lib/contexts/AppContext';

/* eslint-disable-next-line */
export interface UsersProps {}

export function Users(props: UsersProps) {
  const { data: usersList } = useGetUsers();
  const context = useContext(AppContext);

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

  const sortByObj = [
    {
      label : 'First name',
      name : 'sorting',
      value : 'firstName'
    },
    {
      label : 'Last name',
      name : 'sorting',
      value : 'lastName'
    }
  ]
  
  const handleSortingChange = (value: string) => {
    context.setSortBy(value);
  };

  const handleOrderChange = (value: string) => {
    context.setSortOrder(value);
  };

  const valueToChecked = context.sortOrder;
  return (
    <div className={styles.container}>
      <PrivateLayout>
        <div className={styles.dashboard_page_container}>
          <div className={styles.header_and_user_detail_section}>
            <FilterContainer 
              sortByObj={sortByObj}
              onSortingChange={handleSortingChange}
              onOrderChange={handleOrderChange}
              valueToChecked={valueToChecked}
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
