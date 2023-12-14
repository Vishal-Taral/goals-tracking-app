import styles from './index.module.scss';
import { Menus , UserDetailSection , Header } from '@goal-tracker/ui';
import { useContext, useEffect, useState } from 'react';
import AppContext from 'libs/shared/ui/src/lib/contexts/AppContext';
import { apiUrlObject } from '@goal-tracker/data-access';

/* eslint-disable-next-line */
export interface TrackerProps {}

export function Tracker(props: TrackerProps) {
  const context = useContext(AppContext);

  const categoriesData = context.categories?.data?.data;
  // console.log(context.categories?.data?.data);   
  

  const users = {
    headings: ['Id', 'Goal Name','Update', 'Delete'],
    rows: categoriesData
  };
  const roles = {
    headings: ['Name', 'Email', 'Update', 'Delete'],
    rows: [
      {
        Name: 'Admin',
        Email: 'admin@gmail.com',
      },
      {
        Name: 'Employee',
        Email: 'employee@gmail.com',
      },
    ],
  };

  const [tableData, setTableData] = useState('');
  useEffect(() => {
    if(context.manage == 'Manage Roles'){
    setTableData(roles);
    } else if(context.manage == 'Manage Categories'){
      setTableData(users)
    }else {
      setTableData('')
    }
  }, [context]);

  return (
    <div className={styles.container}>
      <div className={styles.dashboard_page_container}>
        <div>
          <Menus />
        </div>
        <div className={styles.header_and_user_detail_section}>
          <Header />
          <UserDetailSection tableData={tableData} />
        </div>
      </div>
    </div>
  );
}

export default Tracker;
