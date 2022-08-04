import {
  Text as ChakraText,
  TextProps as ChakraTextProps,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface TextProps extends  ChakraTextProps {}

export function Text(props: TextProps) {
  return <ChakraText {...props} />;
}

export default Text;
