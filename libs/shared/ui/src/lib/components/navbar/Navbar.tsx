import { Button } from '@certify-d/shared-ui';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, Grid, GridItem, HStack, Link, Stack } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
import Heading from '../heading/Heading';
import styles from './Navbar.module.scss';

export interface NavbarProps {
  icon?: ReactNode;
  header: ReactNode;
  links: NavbarLink[];
  extraBtn?: NavbarLinkExtraBtn;
}

export interface NavbarLinkExtraBtn {
  onClick(): void;
  title: string;
}

export interface NavbarLink {
  title: string;
  link: string;
}

export function Navbar(props: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggle = () => setIsMenuOpen(!isMenuOpen);

  return (
    <Box as="nav" bg={'white'} w={'full'}>
      <Grid h="24" templateColumns={'repeat(12, 1fr)'}>
        <GridItem
          colSpan={6}
          w="100%"
          h="100%"
          className={styles['centerItems']}
        >
          <Stack pl={{ base: 4, lg: 16 }} spacing={'32'} direction={'row'}>
            <HStack spacing={'4'}>
              {props.icon && props.icon}
              <Heading fontSize={'3xl'} fontWeight="extrabold">
                {props.header}
              </Heading>
            </HStack>
          </Stack>
        </GridItem>
        <GridItem colSpan={6}>
          <Box
            className={styles['centerItems']}
            alignItems="flex-end"
            pr={{ base: 4, lg: 16 }}
            h="100%"
          >
            <Button
              display={{ base: 'inherit', lg: 'none' }}
              onClick={toggle}
              rightIcon={isMenuOpen ? <CloseIcon h={3} /> : <HamburgerIcon />}
              variant={'ghost'}
            >
              {isMenuOpen ? 'Close' : 'Menu'}
            </Button>
            <Box display={{ base: 'none', lg: 'block' }}>
              <MenuOptions
                items={props.links}
                isOpen={isMenuOpen}
                extraBtn={props.extraBtn}
              />
            </Box>
          </Box>
        </GridItem>
      </Grid>
      <Box display={{ base: isMenuOpen ? 'block' : 'none', lg: 'none' }} p={2}>
        <Box borderRadius={'0.5em'} bg="muted.100" p={4} pt={8}>
          <MenuOptions
            items={props.links}
            isOpen={isMenuOpen}
            extraBtn={props.extraBtn}
          />
        </Box>
      </Box>
    </Box>
  );
}

function MenuOptions(props: {
  items: NavbarLink[];
  isOpen: boolean;
  extraBtn?: NavbarLinkExtraBtn;
}) {
  return (
    <Stack spacing={10} direction={{ base: 'column', lg: 'row' }}>
      {props.items.map((item) => (
        <Link
          key={item.title}
          className={styles['centerItems']}
          href={item.link}
          fontWeight={'semibold'}
        >
          {item.title}
        </Link>
      ))}
      {props.extraBtn && <MenuExtraBtn extraBtn={props.extraBtn} />}
    </Stack>
  );
}

function MenuExtraBtn(props: { extraBtn: NavbarLinkExtraBtn }) {
  return (
    <Button
      w={'7em'}
      variant={{ base: 'outline' }}
      onClick={props.extraBtn.onClick}
    >
      {props.extraBtn.title}
    </Button>
  );
}

export default Navbar;
