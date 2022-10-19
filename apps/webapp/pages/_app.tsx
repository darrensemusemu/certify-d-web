import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import NextLink from 'next/link';
import './styles.css';
import { Link, Logo, Navbar, SharedUiProvider } from '@certify-d/shared-ui';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <SharedUiProvider>
      <Head>
        <title>Certify-d - Dashboard</title>
      </Head>
      <Navbar
        links={[]}
        logo={
          <Link href="/">
            <Logo variant="light" />
          </Link>
        }
      />
      <main className="app">
        <Component {...pageProps} />
      </main>
    </SharedUiProvider>
  );
}

export default CustomApp;
