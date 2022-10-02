import { Flex } from '@chakra-ui/react';
import { Text } from '@certify-d/shared-ui';

export interface UsageStatProps {
  usage: string;
  description: string;
}

export function UsageStat(props: UsageStatProps) {
  return (
    <Flex px={10} py={4} minW="18.75em" direction="column" alignItems="center">
      <Text fontSize={'4xl'} fontWeight="semibold">
        {props.usage}
      </Text>
      <Text>{props.description}</Text>
    </Flex>
  );
}

export default UsageStat;
