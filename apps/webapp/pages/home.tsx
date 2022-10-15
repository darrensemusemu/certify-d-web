import { useLogoutHandler } from '@certify-d/kratos-helper';
import { Button } from '@certify-d/shared-ui';

function HomePage() {
  const logout = useLogoutHandler();
  return <Button onClick={() => logout()}>Sign out</Button>;
}

export default HomePage;
