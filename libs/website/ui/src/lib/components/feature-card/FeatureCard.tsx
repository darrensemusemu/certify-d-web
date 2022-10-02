import { Box, Flex } from '@chakra-ui/react';
import { Text } from '@certify-d/shared-ui';
import styles from './FeatureCard.module.scss';
import { Children } from 'react';

export interface FeatureCardProps {
  header: string[];
  text?: string;
  illustationSrc?: string;
  textPosition?: 'left' | 'right';
  backgroundColor?: string;
}

export function FeatureCard(props: FeatureCardProps) {
  return (
    <Flex
      w="100%"
      h="27.5em"
      bg={props.backgroundColor ?? 'muted.100'}
      direction={props.textPosition === 'left' ? 'row-reverse' : 'row'}
    >
      <Box
        w="50%"
        className={styles['illustationContainer']}
        sx={{
          backgroundImage: props.illustationSrc,
        }}
      />
      <Box
        p={4}
        w="28em"
        className={props.text ? styles['header'] : styles['headerCenter']}
      >
        <Box>
          {Children.toArray(
            props.header.map((item) => (
              <Text fontSize="4xl" fontWeight="semibold">
                {item}
              </Text>
            ))
          )}
        </Box>
        {props.text && (
          <Text fontSize="3xl" className={styles['text']}>
            {props.text}
          </Text>
        )}
      </Box>
    </Flex>
  );
}

export default FeatureCard;
