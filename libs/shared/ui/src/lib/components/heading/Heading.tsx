import {
  Heading as ChakraHeading,
  HeadingProps as ChakraHeadingProps,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface HeadingProps extends ChakraHeadingProps {}

export function Heading(props: HeadingProps) {
  return <ChakraHeading {...props} />;
}

export default Heading;
