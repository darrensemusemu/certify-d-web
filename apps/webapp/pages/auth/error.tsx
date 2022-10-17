import { Error } from '@certify-d/kratos-helper';
import { NextPage } from 'next';

const ErrorPage: NextPage = () => {
  return (
    <div>
      <Error />
    </div>
  );
};

export default ErrorPage;
