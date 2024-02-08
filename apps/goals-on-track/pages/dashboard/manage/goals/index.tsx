// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  ErrorHandler,
  ManageGoals,
} from '@goal-tracker/ui';
// eslint-disable-next-line @nx/enforce-module-boundaries
import PrivateLayout from 'apps/goals-on-track/component/common/privateLayout/private-layout';
import React from 'react';
import styles from './index.module.scss';

const Goals = () => {
  const goals: any = {
    headings: ['ID', 'Name', 'Description', 'Status', 'Start Date','end Date' ,'Update', 'Delete'],
  };
  return (
    <div className={styles.container}>
      <PrivateLayout>
        <div className={styles.dashboard_page_container}>
          <div className={styles.header_and_user_detail_section}>
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
