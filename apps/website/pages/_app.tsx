import {
  Footer,
  Navbar,
  NavbarLink,
  SharedUiProvider,
} from '@certify-d/shared-ui';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import './styles.css';

const navbarLinks: NavbarLink[] = [
  { title: 'Home', link: '/#Home' },
  { title: 'Product', link: '/#Product' },
  // { title: 'Pricing', link: '#Pricing' }, TODO: pricing info not yet available
  { title: 'Contact Us', link: '/#ContactUs' },
];

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <SharedUiProvider>
      <Head>
        <title>Certify-d</title>
      </Head>
      <Navbar
        links={navbarLinks}
        extraBtn={{
          title: 'Login',
          onClick: () => router.replace('/dash/auth/login'),
        }}
      />
      <main className="app">
        <Component {...pageProps} />
      </main>
      <Footer />
    </SharedUiProvider>
  );
}

export default CustomApp;
