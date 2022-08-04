import { Navbar, NavbarLink, SharedUiProvider } from '@certify-d/shared-ui';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Image from 'next/image';
import './styles.css';

const navbarLinks: NavbarLink[] = [
  { title: 'Home', link: '#Home' },
  { title: 'Product', link: '#Product' },
  { title: 'Pricing', link: '#Pricing' },
  { title: 'Contact Us', link: '#ContactUs' },
];

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <SharedUiProvider>
      <Head>
        <title>Certify-d</title>
      </Head>
      <Navbar
        header="Certify-d"
        links={navbarLinks}
        icon={
          <Image
            alt="Logo"
            width={34}
            height={34}
            src={'/static/images/light-logo.svg'}
          />
        }
        extraBtn={{
          title: 'Login',
          onClick: () => console.log('TODO: handle click'),
        }}
      />
      <main className="app">
        <Component {...pageProps} />
      </main>
    </SharedUiProvider>
  );
}

export default CustomApp;
