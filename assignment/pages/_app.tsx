import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { GenresProvider } from '../contexts/GenresContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GenresProvider>
      <Component {...pageProps} />{' '}
    </GenresProvider>
  );
}

export default MyApp;
