import styles from './private-layout.module.scss';
import { Header , Footer , Menus } from '@goal-tracker/ui';

/* eslint-disable-next-line */
export interface PrivateLayoutProps {
  children : any;
}

export function PrivateLayout(props: PrivateLayoutProps) {
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
