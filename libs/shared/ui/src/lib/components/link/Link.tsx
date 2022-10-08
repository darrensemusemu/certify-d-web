import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface LinkProps extends ChakraLinkProps {}

export function Link(props: LinkProps) {
  return <ChakraLink {...props} />;
}

export default Link;
