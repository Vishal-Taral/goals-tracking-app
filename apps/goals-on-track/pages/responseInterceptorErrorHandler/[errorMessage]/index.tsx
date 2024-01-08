import { Footer } from '@goal-tracker/ui';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './index.module.scss';
import PrivateLayout from 'apps/goals-on-track/component/common/privateLayout/private-layout';

const ResponseInterceptorErrorHandler = () => {
  const router = useRouter();
  const message = router.query.errorMessage

  const redirectHandler = () => {
    router.push('/')
  }
  return (
    <PrivateLayout>
      <div className={styles.container}>
        <div className={styles.errorMessage}>Response interceptor message</div>
        <div className={styles.errorMessage}>{message}</div>
        <button
          className={styles.redirectButton}
          onClick={redirectHandler}
        >
          Redirect to Home page
        </button>
      </div>
    </PrivateLayout>
  );
};

export default ResponseInterceptorErrorHandler;
