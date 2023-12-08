import styles from './index.module.scss';
import Menus from '../../../../libs/shared/ui/src/lib/components/menus/menus';
import UserDetailSection from '../../../../libs/shared/ui/src/lib/components/user-detail-section/user-detail-section';
import Header from '../../../../libs/shared/ui/src/lib/components/header/header';

/* eslint-disable-next-line */
export interface TrackerProps {}

export function Tracker(props: TrackerProps) {
  return (
    <div className={styles.container}>
      <div className={styles.dashboard_page_container}>
        <div><Menus /></div>

        <div className={styles.header_and_user_detail_section}>
          <Header />
          <UserDetailSection />
        </div>
      </div>
    </div>
  );
}

export default Tracker;
