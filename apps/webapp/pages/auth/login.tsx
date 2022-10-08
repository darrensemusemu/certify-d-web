import { Login } from '@certify-d/kratos-helper';
import { Link } from '@certify-d/shared-ui';
import { NextPage } from 'next';
import NextLink from 'next/link';

const LoginPage: NextPage = () => {
  return (
    <Login
      createAccountBtn={({ href, passHref }) => (
        <NextLink href={href} passHref={passHref}>
          <Link>Create account</Link>
        </NextLink>
      )}
      registerAccountBtn={({ href, passHref }) => (
        <NextLink href={href} passHref={passHref}>
          <Link>Recover your account</Link>
        </NextLink>
      )}
    />
  );
};

export default LoginPage;
