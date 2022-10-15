import { Button, Input } from '@certify-d/shared-ui';
import { Registration } from '@certify-d/kratos-helper';
import { NextPage } from 'next';

const LoginPage: NextPage = () => {
  return (
    <div>
      <Registration />
    </div>
  );
};

export default LoginPage;
