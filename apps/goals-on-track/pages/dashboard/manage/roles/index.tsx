import { ErrorHandler, ManageRoles } from '@goal-tracker/ui';
import PrivateLayout from 'apps/goals-on-track/component/common/privateLayout/private-layout';
import { Suspense, lazy, useContext, useState } from 'react';
import styles from './index.module.scss';
import AppContext from 'libs/shared/ui/src/lib/contexts/AppContext';

const Roles = () => {
  const context = useContext(AppContext);
  const [searchRoleName, setSearchRoletName] = useState('');
  const [searchDescription, setSearchDescription] = useState('');

  const Component = lazy(()=> import('@goal-tracker/ui').then((module)=> ({default: module.FilterContainer})))

  const roles: any = {
    headings: ['ID', 'Name', 'Description', 'Update', 'Delete'],
  };

  return (
    <div className={styles.container}>
      <PrivateLayout>
        <div className={styles.dashboard_page_container}>
          <div className={styles.header_and_user_detail_section}>
            <ErrorHandler>
              <ManageRoles tableData={roles} />
            </ErrorHandler>
          </div>
        </div>
      </PrivateLayout>
    </div>
  );
};

export default Roles;
