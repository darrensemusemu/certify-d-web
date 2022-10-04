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
      <GridItem colSpan={{ base: 12, lg: 5 }} w="100%" h="100%">
        {props.children}
      </GridItem>
      <GridItem
        colSpan={{ base: 12, sm: 6, md: 4, lg: 2 }}
        w="100%"
        h="100%"
        position={'relative'}
      >
        {props.secondaryIllustration}
      </GridItem>
      <GridItem
        colSpan={{ base: 3, sm: 6, md: 8, lg: 5 }}
        display={{ base: 'none', sm: 'inherit' }}
        w="100%"
        h="100%"
      >
        <Flex
          bg="brand.100"
          h="100%"
          p={{ base: 8 }}
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
