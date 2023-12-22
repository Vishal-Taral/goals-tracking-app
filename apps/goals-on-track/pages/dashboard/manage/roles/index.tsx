import { useGetRoles } from '@goal-tracker/data-access'
import { ManageRoles } from '@goal-tracker/ui'
import PrivateLayout from 'apps/goals-on-track/component/common/privateLayout/private-layout'
import HOCAuth from 'libs/shared/ui/src/lib/components/HOCAuth/HOCAuth'
import React from 'react'
import styles from './index.module.scss';

const Roles = () => {
    const {data: rolesList} = useGetRoles()
    const roles : any = {
        headings: ['ID', 'Name', 'Description', 'Update', 'Delete'],
        rows: rolesList,
      };
  return (
    <div className={styles.container}>
    <PrivateLayout>
    <div className={styles.dashboard_page_container}>
      <div className={styles.header_and_user_detail_section}>
      <ManageRoles tableData={roles}  />
      </div>
    </div>
    </PrivateLayout>
  </div>
  )
}

export default Roles
