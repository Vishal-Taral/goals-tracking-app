import { useGetCategories } from '@goal-tracker/data-access'
import { ManageCategories } from '@goal-tracker/ui'
import PrivateLayout from 'apps/goals-on-track/component/common/privateLayout/private-layout'
import HOCAuth from 'libs/shared/ui/src/lib/components/HOCAuth/HOCAuth'
import React from 'react'
import styles from './index.module.scss';

const Categories = () => {
  const { data: categoriesList, isError } = useGetCategories();
  const categories : any = {
    headings: ['Category Id', 'Name','Update', 'Delete'],
    rows: categoriesList
  };
  
  return (
    <div className={styles.container}>
    <PrivateLayout>
    <div className={styles.dashboard_page_container}>
      <div className={styles.header_and_user_detail_section}>
      <ManageCategories tableData={categories}  />
      </div>
    </div>
    </PrivateLayout>
  </div>
  )
}

export default Categories
