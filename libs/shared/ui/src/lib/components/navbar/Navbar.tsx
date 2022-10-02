import { Button } from '@certify-d/shared-ui';
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Link,
  Stack,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import Heading from '../heading/Heading';
import styles from './Navbar.module.scss';

export interface NavbarProps {
  icon?: ReactNode;
  header: ReactNode;
  links: NavbarLink[];
  extraBtn?: { title: string; onClick(): void };
}

export interface NavbarLink {
  title: string;
  link: string;
}

export function Navbar(props: NavbarProps) {
  return (
    <nav>
      <Grid h="24" templateColumns={'repeat(12, 1fr)'}>
        <GridItem
          colSpan={6}
          w="100%"
          h="100%"
          className={styles['centerItems']}
        >
          <Stack pl={16} spacing={'32'} direction={'row'}>
            <HStack spacing={'4'}>
              {props.icon && props.icon}
              <Heading fontSize={24}>{props.header}</Heading>
            </HStack>
            <Stack spacing={6} direction="row">
              {props.links.map((item) => (
                <Link
                  key={item.title}
                  href={item.link}
                  className={styles['centerItems']}
                >
                  {item.title}
                </Link>
              ))}
            </Stack>
          </Stack>
        </GridItem>
        <GridItem colSpan={2} w="100%" h="100%" />
        {props.extraBtn && (
          <GridItem colSpan={4} w="100%" h="100%" pr={16}>
            <Box
              bg="brand.100"
              h="100%"
              pr={16}
              className={styles['centerItems']}
            >
              <Button
                w={'8em'}
                bg="#fff"
                variant={'solid'}
                alignSelf={'flex-end'}
                onClick={props.extraBtn.onClick}
              >
                {props.extraBtn.title}
              </Button>
            </Box>
          </GridItem>
        )}
      </Grid>
    </nav>
  );
}

export default Navbar;
