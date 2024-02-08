// eslint-disable-next-line @nx/enforce-module-boundaries
import { ErrorHandler, ManageRoles } from '@goal-tracker/ui';
// eslint-disable-next-line @nx/enforce-module-boundaries
import PrivateLayout from 'apps/goals-on-track/component/common/privateLayout/private-layout';
import styles from './index.module.scss';

const Roles = () => {
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
