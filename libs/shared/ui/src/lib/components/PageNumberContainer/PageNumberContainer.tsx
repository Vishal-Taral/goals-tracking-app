import styles from './PageNumberContainer.module.scss';

/* eslint-disable-next-line */
export interface PageNumberContainerProps {}

export function PageNumberContainer(props: PageNumberContainerProps) {
  return (
    <span className={styles.pageNumber_container}>
      <div className={styles.pageNumber}>Prev</div>
      <div className={styles.pageNumberSelected}>1</div>
      <div className={styles.pageNumber}>2</div>
      <div className={styles.pageNumber}>Next</div>
    </span>
  );
}

export default PageNumberContainer;
