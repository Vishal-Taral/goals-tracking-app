import { useContext, useEffect } from 'react';
import styles from './private-layout.module.scss';
import { Header, Footer, Menus , BreadCrumb } from '@goal-tracker/ui';
import { useRouter } from 'next/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import AppContext from 'libs/shared/ui/src/lib/contexts/AppContext';

/* eslint-disable-next-line */
export interface PrivateLayoutProps {
  children: React.ReactNode;
}

export function PrivateLayout(props: PrivateLayoutProps) {
  const context = useContext(AppContext);

  const router = useRouter();
  useEffect(() => {
    if (context?.manage == 'Roles') {
      router.push('./roles');
    } else if (context?.manage == 'Categories') {
      router.push('./categories');
    } else if (context?.manage == 'Users') {
      router.push('./users');
    } else if (context?.manage == 'Account') {
      router.push('./Account');
    } else if (context?.manage == 'Goals') {
      router.push('./goals');
    }
  }, [context?.manage]);

  return (
    <div className={styles.privateLayout}>
      <div className={styles.privateLayout_left}>
        <div>
          <Menus />
        </div>
        <div className={styles.privateLayout_right}>
          <Header />
          <BreadCrumb />
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PrivateLayout;
