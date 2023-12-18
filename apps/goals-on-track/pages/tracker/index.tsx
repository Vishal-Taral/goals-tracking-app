import styles from './index.module.scss';
import { Menus , UserDetailSection , Header } from '@goal-tracker/ui';
import { useContext, useEffect, useState } from 'react';
import AppContext from 'libs/shared/ui/src/lib/contexts/AppContext';
import { apiUrlObject } from '@goal-tracker/data-access';
import HOCAuth from 'libs/shared/ui/src/lib/components/HOCAuth/HOCAuth';
import PrivateLayout from 'apps/goals-on-track/component/common/privateLayout/private-layout';

/* eslint-disable-next-line */
export interface TrackerProps {}

export function Tracker(props: TrackerProps) {
  const context = useContext(AppContext);

  console.log("roals",context.roles);
  console.log("categories",context?.categories?.data?.data);
  
  const users = {
    headings: ['Category Id', 'Goal Name','Update', 'Delete'],
    rows: context.categories?.data?.data
  };
  const roles = {
    headings: ['Roll Id', 'Roll Name', 'Description' , 'Update', 'Delete'],
    rows: context.roles?.data?.data
  };

  const [tableData, setTableData] = useState('');
  useEffect(() => {
    if(context.manage == 'Manage Roles'){
    setTableData(roles);
    } else if(context.manage == 'Manage Categories'){
      setTableData(users);
    }else {
      setTableData('')
    }
  }, [context]);

  return (
    <div className={styles.container}>
      <PrivateLayout>
      <div className={styles.dashboard_page_container}>
        <div className={styles.header_and_user_detail_section}>
          <HOCAuth Component={UserDetailSection} tableData={tableData}  />
        </div>
      </div>
      </PrivateLayout>
    </div>
  );
}

export default Tracker;
