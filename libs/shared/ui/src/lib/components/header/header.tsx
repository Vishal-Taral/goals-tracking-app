import styles from './header.module.scss';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import logo from '../../assets/goal_tracker_logo.jpg';
import Image from 'next/image';
import Button from '@mui/material/Button';

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
            <div>
              <Image src={logo} alt='logo' width={100} height={50} onClick={goToHome} priority/>
            </div>            
            <div className={styles.use_name_and_profile_pic}>
              <h1 className={styles.user_name}>Vishal</h1>
              <Avatar
                alt="Vishal Taral"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 40, height: 40 }}
              />
            </div>
          </div>
        )
      }
    </div>
  );
}

export default Header;
