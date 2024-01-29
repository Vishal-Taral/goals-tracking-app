import { useGetCategories } from '@goal-tracker/data-access';
import { ErrorHandler, FilterContainer, ManageCategories } from '@goal-tracker/ui';
import PrivateLayout from 'apps/goals-on-track/component/common/privateLayout/private-layout';
import HOCAuth from 'libs/shared/ui/src/lib/components/HOCAuth/HOCAuth';
import { useContext, useState } from 'react';
import styles from './index.module.scss';
import AppContext from 'libs/shared/ui/src/lib/contexts/AppContext';

const Categories = () => {
  const { data: categoriesList, isError } = useGetCategories();
  const context = useContext(AppContext);
  const [searchCategoryName, setCategoryName] = useState('');

  const categories: any = {
    headings: ['Category Id', 'Name', 'Update', 'Delete'],
    rows: categoriesList,
  };

  // const handleSortingChange = (value: string) => {
  //   context.setSortBy(value);
  // };

  const handleOrderChange = (value: string) => {
    context.setSortOrderOfCategory(value);
  };

  const valueToChecked = context.sortOrderOfCategory;
  const inputDataForSearchField = [
    {
      value : 'name',
      label : 'Category Name',
      setSearch: setCategoryName
    },
  ]

  const handleSearch = () => {
    context.setCategorySearch(searchCategoryName);
    console.log(context.categorySearch);
  };
  return (
    <div className={styles.container}>
      <PrivateLayout>
        <div className={styles.dashboard_page_container}>
          <div className={styles.header_and_user_detail_section}>
          <FilterContainer 
              // onSortingChange={handleSortingChange}
              // onOrderChange={handleOrderChange}
              // valueToChecked={valueToChecked}
              labelValue1={undefined} 
              labelValue2={undefined}
              inputDataForSearchField={inputDataForSearchField}
              onSearch={handleSearch}
              valueToChecked={undefined} 
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
