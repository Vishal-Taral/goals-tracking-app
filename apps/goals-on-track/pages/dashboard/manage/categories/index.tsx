import { useGetCategories } from '@goal-tracker/data-access';
// eslint-disable-next-line @nx/enforce-module-boundaries
import PrivateLayout from 'apps/goals-on-track/component/common/privateLayout/private-layout';
import styles from './index.module.scss';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ErrorHandler, ManageCategories } from '@goal-tracker/ui';

const Categories = () => {
  const { data: categoriesList } = useGetCategories();

  const categories: any = {
    headings: ['Category Id', 'Name', 'Update', 'Delete'],
    rows: categoriesList,
  };
  return (
    <div className={styles.container}>
      <PrivateLayout>
        <div className={styles.dashboard_page_container}>
          <div className={styles.header_and_user_detail_section}>
            <ErrorHandler>
              <ManageCategories tableData={categories} />
            </ErrorHandler>
          </div>
        </div>
      </PrivateLayout>
    </div>
  );
};

export default Categories;
