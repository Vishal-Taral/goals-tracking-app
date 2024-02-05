import { useContext, useEffect } from 'react';
import styles from './private-layout.module.scss';
import { Header, Footer, Menus } from '@goal-tracker/ui';
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
      router.push('http://localhost:4200/dashboard/manage/roles');
    } else if (context?.manage == 'Categories') {
      router.push('http://localhost:4200/dashboard/manage/categories');
    } else if (context?.manage == 'Users') {
      router.push('http://localhost:4200/dashboard/manage/users');
    } else if (context?.manage == 'Account') {
      router.push('http://localhost:4200/Account');
    } else if (context?.manage == 'Goals') {
      router.push('http://localhost:4200/dashboard/manage/goals');
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
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PrivateLayout;
