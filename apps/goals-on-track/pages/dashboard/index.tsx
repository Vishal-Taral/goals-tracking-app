import styles from './index.module.scss';
import PrivateLayout from 'apps/goals-on-track/component/common/privateLayout/private-layout';
/* eslint-disable-next-line */

export interface DashboardProps {}

export const Dashboard = () => {
  return (
    <div className={styles.container}>
      <PrivateLayout>
      <div className={styles.dashboard_page_container}>
        <div className={styles.header_and_user_detail_section}></div>
      </div>
      </PrivateLayout>
    </div>
  );
}

export default Dashboard;
