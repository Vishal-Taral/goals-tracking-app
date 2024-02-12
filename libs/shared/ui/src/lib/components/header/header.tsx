import styles from './header.module.scss';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { useGetUserAuthorization, usePostLogout } from '@goal-tracker/data-access';
import { useEffect, useState } from 'react';
import { Popper } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';

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

  const closePopper = () => {
    setAnchorEl(null);
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
              className={styles.login_btn}
            >
              Login
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.profile_container}>
          <div className={styles.app_heading}>
            GoalsOnTrack
          </div>
          <div
            onClick={accountHandler}
            className={styles.use_name_and_profile_pic}
          >
            <h1 className={styles.user_profile_pic}>
              {userAuthorization?.response?.firstName[0]}
            </h1>
            <h1 className={styles.name}>
              {userAuthorization?.response?.firstName}
            </h1>
          </div>
          <Popper
            anchorEl={anchorEl}
            open={popoverOpen}
            className={styles.popper}
          >
            <ClickAwayListener onClickAway={closePopper}>
              <div>
                <div onClick={accountClickHandler} className={styles.account}>Account</div>
                <div onClick={logoutClickHandler} className={styles.logout}>Logout</div>
              </div>
            </ClickAwayListener>
          </Popper>
        </div>
      )}
    </div>
  );
}

export default Header;
