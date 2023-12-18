import styles from './index.module.scss';
import { Menus , UserDetailSection , Header, ManageRoles, ManageCategories } from '@goal-tracker/ui';
import { useContext, useEffect, useState } from 'react';
import AppContext from 'libs/shared/ui/src/lib/contexts/AppContext';
import { apiUrlObject } from '@goal-tracker/data-access';
import HOCAuth from 'libs/shared/ui/src/lib/components/HOCAuth/HOCAuth';

/* eslint-disable-next-line */
export interface TrackerProps {}

export function Tracker(props: TrackerProps) {
  const context = useContext(AppContext);

  console.log("roals",context.roles);
  console.log("categories",context?.categories);
  
  

  // const categories = {
  //   headings: ['Category Id', 'Goal Name','Update', 'Delete'],
  //   rows: context.categories?.data?.data
  // };
  // const roles = {
  //   headings: ['Name', 'Email', 'Update', 'Delete'],
  //   rows: context?.roles?.data?.data,
  // };

  const categories = {
    headings: ['Category Id', 'Category Name','Update', 'Delete'],
    rows: [
      {
          categoryId: "c313db86-98cf-11ee-8263-04e56e7607c1",
          name: "1234fitness"
      }
  ]
  };
  const roles = {
    headings: ['Name', 'Description', 'Update', 'Delete'],
    rows: [
      {
          //roleId: "053f798f-cd5d-4a4a-a1df-52f752fb1a66",
          name: "employee",
          description: "employeeRole",
          // createdAt: "2023-12-14T06:39:43.000Z",
          //createdBy: "admin",
          // updatedAt: "2023-12-14T06:39:43.000Z",
          //updatedBy: "admin"
      },
      {
          //roleId: "2883e37c-aaff-414c-87b9-f6f83465d5a0",
          name: "manager",
          description: "managerRole",
          //createdAt: "2023-12-14T06:39:04.000Z",
          //createdBy: "admin",
          //updatedAt: "2023-12-14T06:39:04.000Z",
          //updatedBy: "admin"
      },
      {
          //roleId: "b9063d46-98cf-11ee-8263-04e56e7607c1",
          name: "Admin",
          description: "Administrator Role",
          //createdAt: "2023-12-12T09:27:32.000Z",
          //createdBy: "System",
          //updatedAt: "2023-12-12T09:27:32.000Z",
          //updatedBy: "System"
      }
  ],
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
