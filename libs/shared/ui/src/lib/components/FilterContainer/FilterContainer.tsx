import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../contexts/AppContext';
import styles from './FilterContainer.module.scss';
import { useRouter } from 'next/router';

export interface FilterContainerProps {
  labelValue1: any;
  labelValue2: any;
}

export function FilterContainer({labelValue1, labelValue2}) {
  const router = useRouter()

  const context = useContext(AppContext);

  const handleSortingChange = (value: string) => {
    if (router.pathname.split('/')[3] == 'users') {
      context.setSortBy(value);
    } else if (router.pathname.split('/')[3] == 'roles') {
      context.setSortByRole(value);
    }
  };

  const handleOrderChange = (value: string) => {
    context.setSortOrder(value);
  };

  // useEffect(()=>{
  //   context.setSortBy(labelValue1?.value)
  // },[labelValue1?.value,labelValue2?.value])

  // console.log('filter component updated','context.sortBy',context.sortBy)

  return (
    <div className={styles.filterContainer}>
      {labelValue1 && labelValue2 && <div>
        <h1 className={styles.headings}>Sort By</h1>
        <div className={styles.label_and_inputs}>
          <label>{labelValue1?.label}</label>
          <input
            type="radio"
            name="sorting"
            value={labelValue1?.value}
            checked={context.sortByRole == labelValue1?.value}
            onChange={() => handleSortingChange(labelValue1?.value)}
          />
        </div>

        <div className={styles.label_and_inputs}>
          <label>{labelValue2?.label}</label>
          <input
            type="radio"
            name="sorting"
            value={labelValue2?.value}
            checked={context.sortByRole === labelValue2?.value}
            onChange={() => handleSortingChange(labelValue2?.value)}
          />
        </div>
      </div>}

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
