import styles from './update-category.module.scss';

/* eslint-disable-next-line */
export interface UpdateCategoryProps {}

export function UpdateCategory(props: UpdateCategoryProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to UpdateCategory!</h1>
    </div>
  );
}

export default UpdateCategory;
