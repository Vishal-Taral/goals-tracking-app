import styles from './layout.module.scss';
import { Header , Footer } from '@goal-tracker/ui';
// import { Header } from '@goal-tracker/ui'
import { useRouter } from 'next/router';

/* eslint-disable-next-line */
export interface LayoutProps {
  children : any;
}

export function Layout(props: LayoutProps) {
  const router = useRouter()
  console.log('x', router.pathname.includes('/'))

  return (
    <div className={styles.container}>
      <Header />
      <div>{props.children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
