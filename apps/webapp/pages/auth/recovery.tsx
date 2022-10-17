import { Button } from '@certify-d/shared-ui';
import { Recovery } from '@certify-d/kratos-helper';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const LoginPage: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <Recovery
        loginAccountBtn={({ href }) => (
          <Button variant={'link'} mt={4} onClick={() => router.push(href)}>
            Sign in
          </Button>
        )}
      />
    </div>
  );
};

export default LoginPage;
