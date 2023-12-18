import styles from './index.module.scss';
import { Menus , UserDetailSection , Header, ManageRoles, ManageCategories } from '@goal-tracker/ui';
import { useContext, useEffect, useState } from 'react';
import AppContext from 'libs/shared/ui/src/lib/contexts/AppContext';
import { apiUrlObject, useGetCategories, useGetRoles } from '@goal-tracker/data-access';
import HOCAuth from 'libs/shared/ui/src/lib/components/HOCAuth/HOCAuth';

/* eslint-disable-next-line */
export interface TrackerProps {}

export function Tracker(props: TrackerProps) {
  const context = useContext(AppContext);
  
  const {data: rolesList} = useGetRoles()
  const {data: categoriesList} = useGetCategories()

  console.log('roles', 'categories',rolesList, categoriesList)

  const categories = {
    headings: ['Category Id', 'Goal Name','Update', 'Delete'],
    rows: categoriesList
  };
  const roles = {
    headings: ['ID', 'Name', 'Description', 'Update', 'Delete'],
    rows: rolesList,
  };


  const [tableData, setTableData] = useState('');
  useEffect(() => {
    if(context.manage == 'Manage Roles'){
    setTableData(roles);
    } else if(context.manage == 'Manage Categories'){
      setTableData(categories)
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
          {
            context.manage == 'Manage Roles' && <HOCAuth Component={ManageRoles} tableData={tableData}  />
          }
          {
            context.manage == 'Manage Categories' && <HOCAuth Component={ManageCategories} tableData={tableData}  />
          }
        </div>
      </div>
    </div>
  );
}

export default Tracker;
