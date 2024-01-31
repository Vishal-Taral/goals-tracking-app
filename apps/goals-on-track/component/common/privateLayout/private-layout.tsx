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
    if (context?.manage == 'Manage Roles') {
      router.push('./roles');
    } else if (context?.manage == 'Manage Categories') {
      router.push('./categories');
    } else if (context?.manage == 'Manage Users') {
      router.push('./users');
    } else if (context?.manage == 'Account') {
      router.push('./Account');
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
