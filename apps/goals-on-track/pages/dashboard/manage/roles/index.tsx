import { useGetRoles } from '@goal-tracker/data-access';
import { ErrorHandler, FilterContainer, ManageRoles } from '@goal-tracker/ui';
import PrivateLayout from 'apps/goals-on-track/component/common/privateLayout/private-layout';
import HOCAuth from 'libs/shared/ui/src/lib/components/HOCAuth/HOCAuth';
import {useContext} from 'react';
import styles from './index.module.scss';
import AppContext from 'libs/shared/ui/src/lib/contexts/AppContext';

const Roles = () => {
  const context = useContext(AppContext);
  const roles: any = {
    headings: ['ID', 'Name', 'Description', 'Update', 'Delete'],
  };
  const labelValue1={label: 'Role name',value: 'name'}
  const labelValue2={label: 'Role description',value: 'description'}

  const valueToChecked = context.sortByRole;

  return (
    <div className={styles.container}>
      <PrivateLayout>
        <div className={styles.dashboard_page_container}>
          <div className={styles.header_and_user_detail_section}>
            <FilterContainer labelValue1={labelValue1} labelValue2={labelValue2} valueToChecked={valueToChecked} />
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
