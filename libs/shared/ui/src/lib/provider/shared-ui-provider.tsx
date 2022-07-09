import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import theme from '../theme/theme';

export interface SharedUiProviderProps {
  children?: ReactNode;
}

export function SharedUiProvider({ children }: SharedUiProviderProps) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}

export default SharedUiProvider;
