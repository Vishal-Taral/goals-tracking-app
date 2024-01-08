import React, { useState, useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import Footer from '../footer/footer';
import Login from '../Login/Login';
import Loader from '../Loader/Loader';

const HOCAuth = ({ Component, ...props }: any) => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const authCheck = () => {
    if (localStorage.getItem('AUTHORIZATION') !== null) {
      setAuthenticated(true);
    } else {
      if (router.pathname.includes('/dashboard')) {
        setAuthenticated(false);
        router.push('/login');
      } else {
        setAuthenticated(true);
      }
    }
    setLoading(false);
  };

  useLayoutEffect(() => {
    authCheck();
  }, []);

  if (loading) {
    return <Loader />;
  }
  if (authenticated) {
    return <Component {...props} />;
  } else {
    return <Login />;
  }
};

export default HOCAuth;
