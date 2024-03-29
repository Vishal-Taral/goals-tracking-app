import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// eslint-disable-next-line @nx/enforce-module-boundaries
import ContextProvider from 'libs/shared/ui/src/lib/contexts/ContextProvider';
// eslint-disable-next-line @nx/enforce-module-boundaries
import HOCAuth from 'libs/shared/ui/src/lib/components/HOCAuth/HOCAuth';
import axios from 'axios';
import { useRouter } from 'next/router';

function CustomApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const router = useRouter();

  axios.interceptors.request.use((request) => {
    const token = localStorage.getItem('AUTHORIZATION');
    if (token) {
      request.headers.AUTHORIZATION = token;
    }
    return request;
  });
  // axios.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     router.push(`/responseInterceptorErrorHandler/${error.message}`);
  //   }
  // );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <Head>
            <title>Welcome to goals-on-track!</title>
          </Head>
          <main className="app">
            <HOCAuth Component={Component} {...pageProps} />
            {/* <Component {...pageProps} /> */}
          </main>
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition={'bottom-left'}
          />
        </ContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default CustomApp;
