import { NextPage } from 'next';
import { useLogoutHandler } from '../../utils/kratos';

const Home: NextPage = () => {
  const onLogout = useLogoutHandler();

  return (
    <>
      <h1>Welcome</h1>

      <button onClick={onLogout}>Logout</button>
    </>
  );
};

export default Home;
