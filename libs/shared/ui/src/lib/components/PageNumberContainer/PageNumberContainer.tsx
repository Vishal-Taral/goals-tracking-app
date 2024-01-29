import { useContext, useState } from 'react';
import styles from './PageNumberContainer.module.scss';
import AppContext from '../../contexts/AppContext';

export interface PageNumberContainerProps {
  totalPages: number;
}

export function PageNumberContainer({ totalPages } : PageNumberContainerProps) {
  const context = useContext(AppContext);
  const [activePage, setActivePage] = useState(1);

  const pageNumberHandler = (e : any) => {
    const selectedPage = parseInt(e.target.innerText, 10);
    console.log(selectedPage);
    context.setPageNumber(selectedPage);
    setActivePage(selectedPage);
  };

  let pages = Array(totalPages).fill(0);
  pages = pages.map((data, index) => data = index + 1);

  return (
    <span className={styles.pageNumber_container}>
      {/* <div className={styles.pageNumber}>Prev</div> */}
      {pages.map((data, index) => (
        <div
          className={`${styles.pageNumber} ${activePage === data ? styles.activePage : ''}`}
          onClick={pageNumberHandler}
          key={index}
        >
          {data}
        </div>
      ))}
      {/* <div className={styles.pageNumber}>Next</div> */}
    </span>
  );
}

export default PageNumberContainer;
