import { Flex } from '@chakra-ui/react';
import { Text } from '@certify-d/shared-ui';

export interface UsageStatProps {
  usage: string;
  description: string;
}

export function UsageStat(props: UsageStatProps) {
  return (
    <Flex minW={{ base: '100%' }} direction="column" alignItems="center">
      <Text fontSize={{ base: '2xl', lg: '4xl' }} fontWeight="semibold">
        {props.usage}
      </Text>
      <Text>{props.description}</Text>
    </Flex>
  );
}

export default UsageStat;
