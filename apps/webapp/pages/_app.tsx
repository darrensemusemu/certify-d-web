import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { Heading, Navbar, SharedUiProvider } from '@certify-d/shared-ui';
import { useRouter } from 'next/router';

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <SharedUiProvider>
      <Head>
        <title>Welcome to webapp!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </SharedUiProvider>
  );
}

export default CustomApp;
