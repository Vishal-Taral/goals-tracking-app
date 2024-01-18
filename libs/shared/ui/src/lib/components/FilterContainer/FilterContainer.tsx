import styles from './FilterContainer.module.scss';

/* eslint-disable-next-line */
export interface FilterContainerProps {}

export function FilterContainer(props: FilterContainerProps) {
  return (
    <div className={styles.filterContainer}>
      <h1>Filters</h1>
    </div>
  );
}

export default FilterContainer;
