import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

export function Button({ children, ...props }: ButtonProps) {
  return <ChakraButton {...props}>{children}</ChakraButton>;
}

export default Button;
