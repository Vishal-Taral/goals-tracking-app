import styles from './data-access.module.scss';

/* eslint-disable-next-line */
export interface DataAccessProps {}

export function DataAccess(props: DataAccessProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to DataAccess!</h1>
    </div>
  );
}

export default DataAccess;
