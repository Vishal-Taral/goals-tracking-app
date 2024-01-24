import React, { useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import styles from './FilterContainer.module.scss';

export interface FilterContainerProps {}

export function FilterContainer(props: FilterContainerProps) {
  const context = useContext(AppContext);

  const handleSortingChange = (value: string) => {
    context.setSortBy(value);
  };

  const handleOrderChange = (value: string) => {
    context.setSortOrder(value);
  };

  return (
    <div className={styles.filterContainer}>
      <div>
        <h1 className={styles.headings}>Sort By</h1>
        <div className={styles.label_and_inputs}>
          <label>First name</label>
          <input
            type="radio"
            name="sorting"
            value="firstName"
            checked={context.sortBy === 'firstName'}
            onChange={() => handleSortingChange('firstName')}
          />
        </div>

        <div className={styles.label_and_inputs}>
          <label>Last name</label>
          <input
            type="radio"
            name="sorting"
            value="lastName"
            checked={context.sortBy === 'lastName'}
            onChange={() => handleSortingChange('lastName')}
          />
        </div>
      </div>

      <div>
        <h1 className={styles.headings}>Order By</h1>
        <div className={styles.label_and_inputs}>
          <label>Ascending</label>
          <input
            type="radio"
            name="order"
            value="asc"
            checked={context.sortOrder === 'asc'}
            onChange={() => handleOrderChange('asc')}
          />
        </div>

        <div className={styles.label_and_inputs}>
          <label>Descending</label>
          <input
            type="radio"
            name="order"
            value="desc"
            checked={context.sortOrder === 'desc'}
            onChange={() => handleOrderChange('desc')}
          />
        </div>
      </div>
    </div>
  );
}
