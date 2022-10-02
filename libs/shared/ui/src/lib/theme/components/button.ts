import type { ComponentStyleConfig } from '@chakra-ui/theme';
import { StyleFunctionProps } from '@chakra-ui/theme-tools';

// You can also use the more specific type for
// a single part component: ComponentSingleStyleConfig
const ButtonStyle: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: '0',
    maxWidth: '15.5em',
    fontWeight: 'normal'
  },
  sizes: {},
  variants: {
    ghost: (props: StyleFunctionProps) => ({
      color: '#000',
    }),
    solid: (props: StyleFunctionProps) => ({
      color: '#000',
      bg: "brand.200"
    }),
    outline: (props: StyleFunctionProps) => ({
      color: '#000',
    }),
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
};

export default ButtonStyle;
