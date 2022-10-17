import { useLogoutHandler } from '@certify-d/kratos-helper';
import { Button, Heading } from '@certify-d/shared-ui';
import { Flex } from '@chakra-ui/react';

function HomePage() {
  const logout = useLogoutHandler();
  return (
    <Flex direction={'column'} alignItems="center" justify={'center'} h="60vh">
      <Heading fontWeight={'semibold'} my={4}>
        Coming Soon!
      </Heading>
      <Button onClick={() => logout()}>Sign out</Button>;
    </Flex>
  );
}

export default HomePage;
