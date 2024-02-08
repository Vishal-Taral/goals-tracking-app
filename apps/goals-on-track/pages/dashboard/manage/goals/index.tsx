import {
  ErrorHandler,
  FilterContainer,
  ManageGoals,
} from '@goal-tracker/ui';
// eslint-disable-next-line @nx/enforce-module-boundaries
import PrivateLayout from 'apps/goals-on-track/component/common/privateLayout/private-layout';
import React, { Suspense, lazy, useContext, useState } from 'react';
import styles from './index.module.scss';
// eslint-disable-next-line @nx/enforce-module-boundaries
import AppContext from 'libs/shared/ui/src/lib/contexts/AppContext';

const Goals = () => {
  const context = useContext(AppContext);
  const [searchRoleName, setSearchRoletName] = useState('');
  const [searchDescription, setSearchDescription] = useState('');

  const Component = lazy(()=>import('@goal-tracker/ui').then((module)=>({default: module.FilterContainer})))

  const goals: any = {
    headings: ['ID', 'Name', 'Description', 'Status', 'Start Date','end Date' ,'Update', 'Delete'],
  };
  const inputDataForSearchField = [
    {
      value: 'role',
      label: 'Goals Name',
      setSearch: setSearchRoletName,
    },
    {
      value: 'desc',
      label: 'Goals Description',
      setSearch: setSearchDescription,
    },
  ];
  const handleSearch = () => {
    context?.setRoleNameSearch(searchRoleName);
    context?.setDescriptionSearch(searchDescription);
  };
  return (
    <div className={styles.container}>
      <PrivateLayout>
        <div className={styles.dashboard_page_container}>
          <div className={styles.header_and_user_detail_section}>
            <Suspense fallback={'Loading'}>
            <Component
              inputDataForSearchField={inputDataForSearchField}
              onSearch={handleSearch}
            />
            </Suspense>
            <ErrorHandler>
              <ManageGoals tableData={goals} />
            </ErrorHandler>
          </div>
        </div>
      </PrivateLayout>
    </div>
  );
};

export default Goals;
