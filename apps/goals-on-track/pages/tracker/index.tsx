import styles from './index.module.scss';
import Menus from '../../../../libs/shared/ui/src/lib/components/menus/menus';
import { UserDetailSection } from '@goal-tracker/ui';
import Header from '../../../../libs/shared/ui/src/lib/components/header/header';
import { useContext, useEffect, useState } from 'react';
import AppContext from 'libs/shared/ui/src/lib/contexts/AppContext';
import HOCAuth from 'libs/shared/ui/src/lib/components/HOCAuth/HOCAuth';

/* eslint-disable-next-line */
export interface TrackerProps {}

export function Tracker(props: TrackerProps) {
  const context = useContext(AppContext);

  const users = {
    headings: ['Name', 'Goal', 'Duration', 'Email', 'Update', 'Delete'],
    rows: [
      {
        Name: 'Vishal Taral',
        Goal: '2 Kg weight loss',
        Duration: '10 Days',
        Email: 'taral@gmail.com',
      },
      {
        Name: 'Hrishikesh Gore',
        Goal: '2 Kg weight loss',
        Duration: '10 Days',
        Email: 'gore@gmail.com',
      },
      {
        Name: 'Atharv Bhuse',
        Goal: '10 Kg weight loss',
        Duration: '10 Days',
        Email: 'bhuse@gmail.com',
      },
    ],
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
    } else if(context.manage == 'Manage Users'){
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
          <HOCAuth Component={UserDetailSection} tableData={tableData}  />
        </div>
      </div>
    </div>
  );
}

export default Tracker;
