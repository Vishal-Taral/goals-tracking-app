import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../contexts/AppContext';
import styles from './FilterContainer.module.scss';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';

export interface FilterContainerProps {
  inputDataForSearchField?: any;
  onSearch: () => void; 
}

export function FilterContainer({ inputDataForSearchField, onSearch }: FilterContainerProps) {
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

  return (
    <div className={styles.filterContainer}>
      <div className={styles.searching}>
        <h1 className={styles.headings}>Search By</h1>
        {inputDataForSearchField.map((data: any, index: number) => (
          <div className={styles.input_field_section} key={index}>
            <h2>{data.label}</h2>
            <input
              type="text"
              placeholder={`Enter the ${data.label}`}
              className={styles.search_inputs}
              onChange={(e)=>data.setSearch(e.target.value)}
            />
          </div>
        ))}
        <Button onClick={onSearch} variant="contained" size="small" sx={{ mt: 1 }}>
          Search
        </Button>
      </div>
    </div>
  );
}
