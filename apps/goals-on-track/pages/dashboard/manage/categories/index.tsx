import { useGetCategories } from '@goal-tracker/data-access';
import {
  ErrorHandler,
  FilterContainer,
  ManageCategories,
} from '@goal-tracker/ui';
import PrivateLayout from 'apps/goals-on-track/component/common/privateLayout/private-layout';
import { useContext, useState } from 'react';
import styles from './index.module.scss';
import AppContext from 'libs/shared/ui/src/lib/contexts/AppContext';

const Categories = () => {
  const { data: categoriesList } = useGetCategories();
  const context = useContext(AppContext);
  const [searchCategoryName, setCategoryName] = useState('');

  const categories: any = {
    headings: ['Category Id', 'Name', 'Update', 'Delete'],
    rows: categoriesList,
  };

  const inputDataForSearchField = [
    {
      value: 'name',
      label: 'Category Name',
      setSearch: setCategoryName,
    },
  ];

  const handleSearch = () => {
    context?.setCategorySearch(searchCategoryName);
  };
  return (
    <div className={styles.container}>
      <PrivateLayout>
        <div className={styles.dashboard_page_container}>
          <div className={styles.header_and_user_detail_section}>
            <FilterContainer
              inputDataForSearchField={inputDataForSearchField}
              onSearch={handleSearch}
            />
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
