import styles from './index.module.scss';
import Layout from '../component/common/layout/layout';

export function Index() {

  return (
    <div className={styles.page}>
      <Layout>
        <h1>Welcome to goal tracking app</h1>
      </Layout>
    </div>
  );
}

export default Index;
