import styles from './header.module.scss';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { useGetUserAuthorization, usePostLogout } from '@goal-tracker/data-access';
import { useEffect, useState } from 'react';
import { Popper } from '@mui/material';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const router = useRouter();

  const responseData: any = usePostLogout()

  const isLandingPage = router.pathname === '/';

  const openLoginPage = () => {
    router.push('./login');
  };
  const { data: userAuthorization, refetch: refetchUserAuthorization }: any =
    useGetUserAuthorization();

  useEffect(() => {
    refetchUserAuthorization();
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const accountHandler = (event:any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const popoverOpen = Boolean(anchorEl);
  const accountClickHandler = () => {
    router.push('/Account')
  }
  const logoutClickHandler = async() => {
    const response = await responseData.mutateAsync()
    localStorage.removeItem('AUTHORIZATION');
    router.push('/login')
  }
  return (
    <div className={styles.container}>
      {isLandingPage ? (
        <div className={styles.header_container}>
          GoalsOnTrack
          <div>
            <Button
              variant="outlined"
              onClick={openLoginPage}
              style={{ color: 'white', borderColor: 'white' }}
            >
              Login
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.profile_container}>
          <div style={{ fontSize: '2rem', color: 'white', fontWeight: '600' }}>
            GoalsOnTrack
          </div>
          <div
            onClick={accountHandler}
            className={styles.use_name_and_profile_pic}
          >
            <h1
              style={{
                backgroundColor: 'skyblue',
                borderRadius: '100%',
                padding: '0.7rem 1rem',
                fontWeight: '600',
                color: 'white',
              }}
            >
              {userAuthorization?.response?.firstName[0]}
            </h1>
            <h1 style={{color: 'white'}}>
              {userAuthorization?.response?.firstName}
            </h1>
          </div>
          <Popper
            anchorEl={anchorEl}
            open={popoverOpen}
            // handleClose={popoverCloseHandler}
            style={{backgroundColor: 'white',padding: '0.5rem 0.5rem'}}
          >
            <div onClick={accountClickHandler} style={{borderBottom: '1px solid lightgray', padding: '0.4rem'}}>Account</div>
            <div onClick={logoutClickHandler} style={{ padding: '0.4rem'}}>Logout</div>
          </Popper>
        </div>
      )}
    </div>
  );
}

export default Header;
