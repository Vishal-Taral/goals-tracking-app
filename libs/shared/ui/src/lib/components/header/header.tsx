import styles from './header.module.scss';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import logo from '../../assets/goal_tracker_logo.jpg';
import Image from 'next/image';
import Button from '@mui/material/Button';
import { useGetUserAuthorization } from '@goal-tracker/data-access';
import { useEffect } from 'react';

/* eslint-disable-next-line */
export interface HeaderProps { }

export function Header(props: HeaderProps) {
  const router = useRouter();

  const isLandingPage = router.pathname === '/';

  const openLoginPage = () => {
    router.push('./login');
  }

  const goToHome = () => {
    router.push('/tracker')
  }
  console.log('x', router.pathname.includes('/'))
  const {data: userAuthorization, refetch: refetchUserAuthorization} = useGetUserAuthorization()

  useEffect(()=>{refetchUserAuthorization()},[])
  return (
    <div className={styles.container}>
      {
        isLandingPage ? (
          <div className={styles.header_container}>
            {/* <Image src={logo} alt='logo' width={100} height={50} /> */}
            GoalsOnTrack
            <div>
            {/* <button onClick={openLoginPage} className={styles.login_btn}>login</button> */}
              <Button variant="outlined" onClick={openLoginPage} style={{color: 'white',borderColor: 'white'}}>Login</Button>
            </div>
          </div>
        ) : (
          <div className={styles.profile_container}>
            <div style={{fontSize: '2rem',color: 'white',fontWeight: '600'}}>
              GoalsOnTrack
            </div>            
            <div className={styles.use_name_and_profile_pic}>
            <h1 style={{backgroundColor: 'skyblue',borderRadius: '100%',padding: '0.7rem 1rem',fontWeight: '600',color: 'white'}}>{userAuthorization?.response?.firstName[0]}</h1>
              <h1 className={styles.userName} style={{color: 'white'}}>{userAuthorization?.response?.firstName}</h1>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default Header;
