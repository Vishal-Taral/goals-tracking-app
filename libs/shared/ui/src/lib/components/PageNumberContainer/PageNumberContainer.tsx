import { useContext, useState } from 'react';
import styles from './PageNumberContainer.module.scss';
import AppContext from '../../contexts/AppContext';

/* eslint-disable-next-line */
export interface PageNumberContainerProps {
  totalPages: number;
}

export function PageNumberContainer({totalPages}) {
  const context = useContext(AppContext)
  const pageNumberHandler = (e) => {
    console.log(e.target.innerText)
    context.setPageNumber(e.target.innerText)
  }
  let pages=Array(totalPages).fill(0)
  pages=pages.map((data,index)=>data=index+1)
  return (
    <span className={styles.pageNumber_container}>
      {/* <div className={styles.pageNumber}>Prev</div> */}
      {pages.map((data,index)=><div className={styles.pageNumber} onClick={pageNumberHandler}>{data}</div>)}
      {/* <div className={styles.pageNumber}>Next</div> */}
    </span>
  );
}

export default PageNumberContainer;
