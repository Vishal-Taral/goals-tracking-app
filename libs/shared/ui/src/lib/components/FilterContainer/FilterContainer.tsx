import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../contexts/AppContext';
import styles from './FilterContainer.module.scss';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';

export interface FilterContainerProps {
  labelValue1: any;
  labelValue2: any;
  valueToChecked: any;
}

export function FilterContainer({ labelValue1, labelValue2, valueToChecked }: FilterContainerProps) {
  const router = useRouter()
  const context = useContext(AppContext);
  const [firstName, setFirstName] = useState(context.firstNameSearch);
  const [lastName, setLastName] = useState(context.lastNameSearch);
  const [email, setEmail] = useState(context.emailSearch);


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

  const handleSearch = () => {
    // Set the context states with local state values on button click
    context.setFirstNameSearch(firstName);
    context.setLastNameSearch(lastName);
    context.setEmailSearch(email);
  };
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
            checked={valueToChecked == labelValue1?.value}
            onChange={() => handleSortingChange(labelValue1?.value)}
          />
        </div>

        <div className={styles.label_and_inputs}>
          <label>{labelValue2?.label}</label>
          <input
            type="radio"
            name="sorting"
            value={labelValue2?.value}
            checked={valueToChecked === labelValue2?.value}
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

      <div className={styles.searching}>
        <h1 className={styles.headings}>Search By</h1>
        <div className={styles.input_field_section}>
          <h2>First Name</h2>
          <input
            type="text"
            placeholder="Enter the first name"
            className={styles.search_inputs}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className={styles.input_field_section}>
          <h2>last Name</h2>
          <input
            type="text"
            placeholder="Enter the last name"
            className={styles.search_inputs}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className={styles.input_field_section}>
          <h2>Email</h2>
          <input
            type="text"
            placeholder="Enter the email"
            className={styles.search_inputs}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button onClick={handleSearch} variant="contained" size="small" sx={{ mt: 1 }}>
          Search
        </Button>
      </div>
    </div>
  );
}
