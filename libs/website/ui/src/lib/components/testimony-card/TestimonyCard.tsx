import { Avatar, VStack } from '@chakra-ui/react';
import { Text } from '@certify-d/shared-ui';

export interface TestimonyCardProps {
  avatarUrl: string;
}

export function TestimonyCard(props: TestimonyCardProps) {
  return (
    <VStack bg={'muted.100'} spacing={2}>
      <Avatar mt={8} src={props.avatarUrl} />
      <Text fontSize="4xl" fontWeight={'semibold'}>
        “
      </Text>
      <Text px={8} pb={2} align="center">
        Simply awesome. My document was certified in less than about 2 minutes.
        A big time saver.
      </Text>
      <Text fontSize="4xl" fontWeight={'semibold'}>
        ”
      </Text>
    </VStack>
  );
}

export default TestimonyCard;
