import styles from './index.module.scss';
import { ManageRoles, ManageCategories } from '@goal-tracker/ui';
import { useContext, useEffect, useState } from 'react';
import AppContext from 'libs/shared/ui/src/lib/contexts/AppContext';
import { apiUrlObject, useGetCategories, useGetRoles } from '@goal-tracker/data-access';
import HOCAuth from 'libs/shared/ui/src/lib/components/HOCAuth/HOCAuth';
import PrivateLayout from 'apps/goals-on-track/component/common/privateLayout/private-layout';

/* eslint-disable-next-line */
export interface TrackerProps {}

export function Tracker(props: TrackerProps) {
  const context = useContext(AppContext);

  useEffect(() => {
    if(context.manage == 'Manage Roles'){
    setTableData(roles);
    } else if(context.manage == 'Manage Categories'){
      setTableData(categories)
    }else {
      setTableData('')
    }
  }, [context]);

  // const [categoryListData , setCategoryListData] = useState<any>()
  
  const {data: rolesList} = useGetRoles()
  // const { data: categoriesList, isError } = useGetCategories();
  
  

  const categories : any = {
    headings: ['Category Id', 'Name','Update', 'Delete'],
    // rows: categoriesList
  };
  const roles : any = {
    headings: ['ID', 'Name', 'Description', 'Update', 'Delete'],
    rows: rolesList,
  };


  const [tableData, setTableData] = useState('');

  return (
    <div className={styles.container}>
      <PrivateLayout>
      <div className={styles.dashboard_page_container}>
        <div className={styles.header_and_user_detail_section}>
          {
            context.manage == 'Manage Roles' && <HOCAuth Component={ManageRoles} tableData={tableData}  />
          }
          {
            context.manage == 'Manage Categories' && <HOCAuth Component={ManageCategories} tableData={tableData}  />
          }
        </div>
      </div>
      </PrivateLayout>
    </div>
  );
}

export default Tracker;
