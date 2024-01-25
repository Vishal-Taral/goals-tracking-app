import React, { useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import styles from './FilterContainer.module.scss';
import { SortByObj } from '@goal-tracker/data-access';

export interface FilterContainerProps {
  sortByObj?: SortByObj[];
  onSortingChange?: (value: string) => void;
  onOrderChange?: (value: string) => void;
  valueToChecked: string;
}

export function FilterContainer({sortByObj, onSortingChange, onOrderChange ,valueToChecked }: FilterContainerProps) {
  const context = useContext(AppContext);

  return (
    <div className={styles.filterContainer}>
       {sortByObj && sortByObj.length > 0 && (
        <div>
          <h1 className={styles.headings}>Sort By</h1>
          {sortByObj.map((sortOption : any , index : number) => (
            <div key={index} className={styles.label_and_inputs}>
              <label>{sortOption.label}</label>
              <input
                type="radio"
                name={sortOption.name}
                value={sortOption.value}
                checked={context.sortBy === sortOption.value}
                onChange={() => onSortingChange(sortOption.value)}
              />
            </div>
          ))}
        </div>
      )}

      <div>
        <h1 className={styles.headings}>Order By</h1>
        <div className={styles.label_and_inputs}>
          <label>Ascending</label>
          <input
            type="radio"
            name="order"
            value="asc"
            checked={valueToChecked === 'asc'}
            onChange={() => onOrderChange('asc')}
          />
        </div>

        <div className={styles.label_and_inputs}>
          <label>Descending</label>
          <input
            type="radio"
            name="order"
            value="desc"
            checked={valueToChecked === 'desc'}
            onChange={() => onOrderChange('desc')}
          />
        </div>
      </div>
    </div>
  );
}
