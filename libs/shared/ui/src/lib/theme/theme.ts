import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import colors from './colors';

// Global style overrides
// import styles from './styles';

// Foundational style overrides
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import borders from './foundations/borders'

// Component style overrides
import Button from './components/button';

// TODO:
// const config: ThemeConfig = {
//   initialColorMode: 'light',
//   useSystemColorMode: false,
// };

const theme = extendTheme(
  {
    colors: colors,
    components: {
      Button,
    },
  },
  withDefaultColorScheme({ colorScheme: 'brand' }),
);

export default theme;
