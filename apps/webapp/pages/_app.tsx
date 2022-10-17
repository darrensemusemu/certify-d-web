import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { Navbar, SharedUiProvider } from '@certify-d/shared-ui';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <SharedUiProvider>
      <Head>
        <title>Certify-d - Dashboard</title>
      </Head>
      <Navbar links={[]} />
      <main className="app">
        <Component {...pageProps} />
      </main>
    </SharedUiProvider>
  );
}

export default CustomApp;
