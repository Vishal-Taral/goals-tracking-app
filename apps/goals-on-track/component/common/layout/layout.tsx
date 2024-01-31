import styles from './layout.module.scss';
import React from 'react'
import { Header , Footer } from '@goal-tracker/ui';
/* eslint-disable-next-line */
export interface LayoutProps {
  children : React.ReactNode;
}

export function Layout(props: LayoutProps) {
  return (
    <div className={styles.container}>
      <Header />
      <div>{props.children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
