import { Button } from '@certify-d/shared-ui';
import { Verification } from '@certify-d/kratos-helper';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const VerificationPage: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <Verification
        loginAccountBtn={({ href }) => (
          <Button variant={'link'} mt={4} onClick={() => router.push(href)}>
            Sign in
          </Button>
        )}
      />
    </div>
  );
};

export default VerificationPage;
