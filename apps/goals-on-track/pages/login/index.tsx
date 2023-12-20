import styles from './index.module.scss';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export interface LoginProps { }

interface FormData {
  email: string;
  password: string;
}

export function Login(props: LoginProps) {

  const router = useRouter();

  const routFunction = () => {
    router.push('./dashboard')
  }

  const fetchData = async () => {
    const response = await axios.get('http://localhost:3000/loginData');
    return response.data;
  };

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false); 
  const { data: apiData, status: apiStatus } = useQuery({ queryKey: ['todos'], queryFn: fetchData });

  const [loginError, setLoginError] = useState<string | null>(null);
  const [successMassage, setSuccessMassage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = (data: any) => {
    if (apiStatus === 'success' && apiData) {
      if (data.email === apiData.email && data.password === apiData.username) {
        setLoginError(null);
        routFunction();
        setSuccessSnackbar(true);
        setSuccessMassage('You successfully logged in');
      } else {
        setLoginError('Invalid credentials. Please try again.');
        setSnackbarOpen(true);
      }
    }
  };

  const handleCloseSuccessSnackbar = () => {
    setSuccessSnackbar(false);
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.login_container}>
        <h1 className={styles.login_heading}>Log In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.login}>
            <Box component="div">
              <div className={styles.text_fields}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Email is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      id="outlined-required"
                      label="Enter email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Password is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      type="password"
                      id="outlined-required"
                      label="Enter password"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  )}
                />
              </div>
            </Box>
            <Button variant="contained" color="success" type="submit">
              Login
            </Button>
            
            {/* Snackbars for invalid credentials and successfully logged in start */}
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={2000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                severity="error"
                onClose={handleCloseSnackbar}
              >
                {loginError}
              </MuiAlert>
            </Snackbar>

            <Snackbar
              open={successSnackbar}
              autoHideDuration={2000}
              onClose={handleCloseSuccessSnackbar}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                severity="success"
                onClose={handleCloseSuccessSnackbar}
              >
                {successMassage}
              </MuiAlert>
            </Snackbar>
            {/* Snackbars for invalid credentials and successfully logged in end */}

          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
