import styles from './private-layout.module.scss';
import { Header , Footer } from '@goal-tracker/ui';

/* eslint-disable-next-line */
export interface PrivateLayoutProps {
  children : any;
}

export function PrivateLayout(props: PrivateLayoutProps) {
  return (
    <div className={styles['container']}>
      <Header />
      <div>{props.children}</div>
      <Footer />
    </div>
  );
}

export default PrivateLayout;
