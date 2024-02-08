import React from 'react';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ErrorHandler, ManageUsers } from '@goal-tracker/ui';
import styles from './index.module.scss';
import { useGetUsers } from '@goal-tracker/data-access';
// eslint-disable-next-line @nx/enforce-module-boundaries
import PrivateLayout from 'apps/goals-on-track/component/common/privateLayout/private-layout';

/* eslint-disable-next-line */
export interface UsersProps {}

export function Users(props: UsersProps) {
  const { data: usersList } = useGetUsers();
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
  return (
    <div className={styles.container}>
      <PrivateLayout>
        <div className={styles.dashboard_page_container}>
          <div className={styles.header_and_user_detail_section}>
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
