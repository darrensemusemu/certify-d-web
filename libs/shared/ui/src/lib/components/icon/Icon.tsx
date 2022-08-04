import {
  Icon as ChakraIcon,
  IconProps as ChakraIconProps,
} from '@chakra-ui/react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IconProps extends ChakraIconProps {}

export function Icon(props: IconProps) {
  return <ChakraIcon {...props} />;
}

export default Icon;
