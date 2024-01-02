import { useContext, useEffect } from 'react';
import styles from './private-layout.module.scss';
import { Header , Footer , Menus } from '@goal-tracker/ui';
import { useRouter } from 'next/router';
import AppContext from 'libs/shared/ui/src/lib/contexts/AppContext';

/* eslint-disable-next-line */
export interface PrivateLayoutProps {
  children : any;
}

export function PrivateLayout(props: PrivateLayoutProps) {
  const context = useContext(AppContext);
  
  const router = useRouter()
  useEffect(() => {
    if(context?.manage == 'Manage Roles'){
      router.push('http://localhost:4200/dashboard/manage/roles')
    } else if(context?.manage == 'Manage Categories'){
      router.push('http://localhost:4200/dashboard/manage/categories')
    } else if(context?.manage == 'Manage Users'){
      router.push('http://localhost:4200/dashboard/manage/users')
    }
  }, [context.manage]);
  return (
    <div className={styles['container']}>
      <div style={{display: 'flex' , width:'100%'}}>
        <div >
          <Menus />
        </div>

        <div style={{width :'100%'}}>
          <Header />
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PrivateLayout;
