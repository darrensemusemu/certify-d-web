import { Button, Input } from '@certify-d/shared-ui';
import { Registration } from '@certify-d/kratos-helper';
import { NextPage } from 'next';

const LoginPage: NextPage = () => {
  return (
    <div>
      <Input />
      <Registration />
      <Button>Sign in</Button>
    </div>
  );
};

export default LoginPage;
