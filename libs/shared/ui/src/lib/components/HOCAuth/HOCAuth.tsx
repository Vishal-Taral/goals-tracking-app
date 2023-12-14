import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

const HOCAuth = ({ Component, ...props }: any) => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  const authCheck = () => {
    if (localStorage.getItem('token') !== null) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
      router.push('/login')
    }
  }

  useEffect(() => {
    authCheck()
  }, [])

  if (authenticated) {
    console.log('x',authenticated)
    return <Component {...props}/>;
  } else {
    console.log('xx',authenticated)
    return null;
  }
};

export default HOCAuth;