import type { ComponentStyleConfig } from '@chakra-ui/theme';

// You can also use the more specific type for
// a single part component: ComponentSingleStyleConfig
const ButtonStyle: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: '0',
    maxWidth: '250px',
  },
  sizes: {},
  variants: {},
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
};

export default ButtonStyle;
