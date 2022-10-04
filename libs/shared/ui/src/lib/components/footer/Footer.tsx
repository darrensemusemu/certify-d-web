import { Link, Logo, Text } from '@certify-d/shared-ui';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { ReactNode } from 'react';
import styles from './Footer.module.scss';

/* eslint-disable-next-line */
export interface FooterProps {}

const linkData = [
  {
    header: 'Company',
    links: [
      { title: 'Terms and  conditions', href: '/about/terms-and-conditions' },
      { title: 'Privacy Policy', href: '/about/privacy-policy' },
      { title: 'Cookie Policy', href: '/about/cookie-policy' },
    ],
  },
  {
    header: "Let's Chat",
    links: [
      {
        title: 'mail@darrensemusemu.com',
        href: 'mailto:mail+certifyd@darrensemusemu.com',
      },
    ],
  },
];

export function Footer(props: FooterProps) {
  return (
    <Box
      bg={'brand.100'}
      py={{ base: 8, lg: 16 }}
      px={{ base: 4, lg: 16 }}
      className={styles['container']}
    >
      <Grid templateColumns={'repeat(12, 1fr)'}>
        <GridItem colSpan={12} mb={4}>
          <Logo variant="dark" />
        </GridItem>
        <GridItem colSpan={{ base: 12, md: 6, lg: 3 }} py={4}>
          <FooterHeader>Certify with Certify-d</FooterHeader>
          <Text fontSize={'md'} w="80%">
            Innovative online platform to get certified copies of original
            documents
          </Text>
        </GridItem>
        {linkData.map((linkItem) => (
          <GridItem colSpan={{ base: 12, md: 3, lg: 2 }} py={4}>
            <FooterHeader>{linkItem.header}</FooterHeader>
            {linkItem.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                display="block"
                fontSize={'md'}
                py={1}
              >
                {link.title}
              </Link>
            ))}
          </GridItem>
        ))}
        <GridItem colSpan={12} pt={4}>
          <Text fontSize={'md'}>@2022 Certify-d. All rights Reserved</Text>
        </GridItem>
      </Grid>
    </Box>
  );
}

interface FooterHeaderProps {
  children: string;
}

function FooterHeader(props: FooterHeaderProps) {
  return (
    <Text fontSize={'md'} fontWeight="bold" py={2}>
      {props.children}
    </Text>
  );
}

export default Footer;
