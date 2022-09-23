import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { GenresProvider } from '../contexts/GenresContext';
import { TitlesProvider } from '../contexts/TitlesContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TitlesProvider>
      <GenresProvider>
        <Component {...pageProps} />{' '}
      </GenresProvider>
    </TitlesProvider>
  );
}

export default MyApp;
