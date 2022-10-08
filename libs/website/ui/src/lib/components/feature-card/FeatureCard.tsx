import { Box, Flex } from '@chakra-ui/react';
import { Text } from '@certify-d/shared-ui';
import styles from './FeatureCard.module.scss';
import { Children } from 'react';

export interface FeatureCardProps {
  header: string[];
  text?: string;
  illustrationSrc?: string;
  backgroundColor?: string;
}

export function FeatureCard(props: FeatureCardProps) {
  return (
    <Flex
      w="100%"
      minH={{ base: '100%', md: '20em', lg: '30em' }}
      bg={props.backgroundColor ?? 'muted.100'}
      borderRadius="lg"
      direction={{ base: 'column-reverse', md: 'row' }}
      position="relative"
    >
      <Box
        w={{ base: '100%', md: '50%' }}
        h={{ base: '8em', md: '12em', lg: '16em' }}
        className={styles['illustrationContainer']}
        display={props.illustrationSrc ? 'inherit' : 'none'}
        sx={{ backgroundImage: props.illustrationSrc }}
      />
      <Flex
        direction={'column'}
        justify="center"
        px={{ base: 4, md: 8 }}
        py={8}
        w={{ base: '100%', md: '50%' }}
      >
        <Box>
          {Children.toArray(
            props.header.map((item) => (
              <Text
                fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                fontWeight="semibold"
                py={4}
              >
                {item}
              </Text>
            ))
          )}
        </Box>
        {props.text && (
          <Text fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }} py={4}>
            {props.text}
          </Text>
        )}
      </Flex>
    </Flex>
  );
}

export default FeatureCard;
