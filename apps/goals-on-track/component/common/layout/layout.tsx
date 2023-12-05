import styles from './layout.module.scss';
import {Header} from '../../../../../libs/shared/ui/src/lib/components/header/header';

/* eslint-disable-next-line */
export interface LayoutProps {
  children : any;
}

export function Layout(props: LayoutProps) {
  return (
    <div className={styles.container}>
      <Header />
      <div>{props.children}</div>
    </div>
  );
}

export default Layout;
