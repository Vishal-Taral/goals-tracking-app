import styles from './index.module.scss';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

/* eslint-disable-next-line */
export interface LoginProps { }

export function Login(props: LoginProps) {
  const router = useRouter();

  const submitHandler = () => {
    router.push('./tracker')
  }

  return (
    <div className={styles.container}>
      <div className={styles.login_container}>
        <h1 className={styles.login_heading}>Log In</h1>
        <div className={styles.login}>
          <Box
            component="form"
            // sx={{
            //   '& .MuiTextField-root': { m: 1, width: '25ch' },
            // }}
            noValidate
            autoComplete="off"
          >
            <div className={styles.text_fields}>
              <TextField
                required
                id="outlined-required"
                label="Enter email"
                // defaultValue="Email"
              />
              <TextField
                required
                type={'password'}
                id="outlined-required"
                label="Enter password"
                // defaultValue="Password"
              />
            </div>
          </Box>
          <Button variant="contained" color="success" onClick={submitHandler}>Login</Button>
        </div>

        <div className={styles.forgot_password}>
          <h1 className={styles.label}>Forgot password ?</h1>
        </div>
      </div>
    </div>
  );
}

export default Login;