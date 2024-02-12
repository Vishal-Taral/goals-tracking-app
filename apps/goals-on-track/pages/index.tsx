import styles from './index.module.scss';
import Layout from '../component/common/layout/layout';
import { Dashboard } from '@goal-tracker/ui';


export function Index() {

  return (
    <div className={styles.page}>
      <Layout>
        <Dashboard />
      </Layout>
    </div>
  );
}

export default Index;
