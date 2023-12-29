import styles from './index.module.scss';
import { useGetAllUsers } from '@goal-tracker/data-access';
import PrivateLayout from 'apps/goals-on-track/component/common/privateLayout/private-layout';
import HOCAuth from 'libs/shared/ui/src/lib/components/HOCAuth/HOCAuth'
import { ManageUsers } from 'libs/shared/ui/src/lib/components/manageUsers/ManageUsers';

/* eslint-disable-next-line */
export interface UsersProps { }

export function Users(props: UsersProps) {
  const { data: usersList } = useGetAllUsers();

  const users : any = {
    headings: ['Id', 'First Name','Last Name', 'Gender' , 'Email' , 'Mobile No.' , 'Role' , 'update' , 'Delete'],
    rows: usersList
  };

  return (
    <div className={styles.container}>
      <PrivateLayout>
        <div className={styles.dashboard_page_container}>
          <div className={styles.header_and_user_detail_section}>
            <HOCAuth Component={ManageUsers} tableData={users} />
          </div>
        </div>
      </PrivateLayout>

    </div>
  );
}

export default Users;
