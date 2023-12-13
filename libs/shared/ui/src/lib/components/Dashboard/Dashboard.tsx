import styles from './Dashboard.module.scss';

/* eslint-disable-next-line */
export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
  return (
    <div className={styles.dashboard}>
    <div className={styles.goal_button}>All Goals</div>
      <div className={styles.goal_button}>Create Goal</div>
      <div className={styles.goal_button}>Update Goal</div>
      <div className={styles.goal_button}>Delete Goal</div>
    </div>
  );
}

export default Dashboard;
