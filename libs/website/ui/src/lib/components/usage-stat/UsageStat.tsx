import { Box } from '@chakra-ui/react';
import { CSSProperties, ReactNode } from 'react';
import { Text } from '@certify-d/shared-ui';
import styles from './UsageStat.module.scss';

export interface UsageStatProps {
  usage: string;
  description: string;
}

export function UsageStat(props: UsageStatProps) {
  return (
    <Box px={10} py={4} >
      <Text fontSize={'4xl'} fontWeight='semibold'>{props.usage}</Text>
      <Text>{props.description}</Text>
    </Box>
  );
}

export default UsageStat;
