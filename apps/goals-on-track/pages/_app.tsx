import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ContextProvider from 'libs/shared/ui/src/lib/contexts/ContextProvider';
import { useEffect } from 'react';
import HOCAuth from 'libs/shared/ui/src/lib/components/HOCAuth/HOCAuth';
import axios from 'axios';

function CustomApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  console.log('axios', axios)
  axios.interceptors.request.use((request)=> {
    const token = localStorage.getItem('AUTHORIZATION')
    console.log('request', request)
    if(token){
    request.headers.AUTHORIZATION = token
    }
    return request
  })

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <Head>
            <title>Welcome to goals-on-track!</title>
          </Head>
          <main className="app">
            {/* <Component {...pageProps} /> */}
            <HOCAuth Component={Component} {...pageProps}/>
          </main>
          <ReactQueryDevtools initialIsOpen={false} buttonPosition={'bottom-left'} />
        </ContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default CustomApp;
