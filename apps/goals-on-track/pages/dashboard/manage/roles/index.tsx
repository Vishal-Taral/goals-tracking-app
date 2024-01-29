import { useGetRoles } from '@goal-tracker/data-access';
import { ErrorHandler, FilterContainer, ManageRoles } from '@goal-tracker/ui';
import PrivateLayout from 'apps/goals-on-track/component/common/privateLayout/private-layout';
import HOCAuth from 'libs/shared/ui/src/lib/components/HOCAuth/HOCAuth';
import {useContext , useState} from 'react';
import styles from './index.module.scss';
import AppContext from 'libs/shared/ui/src/lib/contexts/AppContext';

const Roles = () => {
  const context = useContext(AppContext);
  const [searchRoleName, setSearchRoletName] = useState('');
  const [searchDescription, setSearchDescription] = useState('');

  const roles: any = {
    headings: ['ID', 'Name', 'Description', 'Update', 'Delete'],
  };
  const labelValue1={label: 'Role name',value: 'name'}
  const labelValue2={label: 'Role description',value: 'description'}

  const valueToChecked = context.sortByRole;

  const inputDataForSearchField = [
    {
      value : 'role',
      label : 'Role Name',
      setSearch: setSearchRoletName
    },
    {
      value : 'desc',
      label : 'Description',
      setSearch:setSearchDescription,
    },
  ]

  const handleSearch = () => {
    context.setRoleNameSearch(searchRoleName);
    context.setDescriptionSearch(searchDescription);
  };

  return (
    <div className={styles.container}>
      <PrivateLayout>
        <div className={styles.dashboard_page_container}>
          <div className={styles.header_and_user_detail_section}>
            <FilterContainer 
              labelValue1={labelValue1} 
              labelValue2={labelValue2} 
              valueToChecked={valueToChecked} 
              inputDataForSearchField={inputDataForSearchField}
              onSearch={handleSearch} 
            />
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
