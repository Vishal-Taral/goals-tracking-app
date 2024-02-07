import { useRouter } from 'next/router';
import React from 'react';
import styles from './index.module.scss';
// eslint-disable-next-line @nx/enforce-module-boundaries
import PrivateLayout from 'apps/goals-on-track/component/common/privateLayout/private-layout';

const ResponseInterceptorErrorHandler = () => {
  const router = useRouter();
  const message = router.query.errorMessage;

  const redirectHandler = () => {
    router.push('/');
  };
  return (
    <PrivateLayout>
      <div className={styles.container}>
        <div className={styles.errorMessageHeading}>
          Response interceptor message
        </div>
        <textarea rows={5} cols={25} readOnly className={styles.errorMessage}>
          {message}
        </textarea>
        <button className={styles.redirectButton} onClick={redirectHandler}>
          Redirect to Home page
        </button>
      </div>
    </PrivateLayout>
  );
};

export default ResponseInterceptorErrorHandler;
