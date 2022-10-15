import { Login } from '@certify-d/kratos-helper';
import { Button, Link } from '@certify-d/shared-ui';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const LoginPage: NextPage = () => {
  const router = useRouter();

  return (
    <Login
      createAccountBtn={({ href }) => (
        <Button variant={'link'} mt={4} onClick={() => router.push(href)}>
          Create account
        </Button>
      )}
      registerAccountBtn={({ href, passHref }) => (
        <Button variant={'link'} mt={4} onClick={() => router.push(href)}>
          Recover your account
        </Button>
      )}
    />
  );
};

export default LoginPage;
