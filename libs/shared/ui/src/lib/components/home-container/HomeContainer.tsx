import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface HomeContainerProps {
  children: ReactNode;
  illustration: ReactNode;
  secondaryIllustration?: ReactNode;
}

export function HomeContainer(props: HomeContainerProps) {
  return (
    <Grid templateColumns={'repeat(12, 1fr)'} h="100%">
      <GridItem colSpan={6} w="100%" h="100%">
        {props.children}
      </GridItem>
      <GridItem colSpan={2} w="100%" h="100%" position={'relative'}>
        {props.secondaryIllustration}
      </GridItem>
      <GridItem colSpan={4} w="100%" h="100%" pr={16}>
        <Flex
          bg="brand.100"
          h="100%"
          p={8}
          flexDirection="column"
          alignItems={'center'}
          justifyContent="end"
        >
          {props.illustration}
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default HomeContainer;
