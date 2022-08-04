import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import colors from './colors';

import '@fontsource/advent-pro';

// Global style overrides
// import styles from './styles';

// Foundational style overrides
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import borders from './foundations/borders';

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
    fonts: {
      heading: `'Advent Pro', sans-serif`,
      body: `'Advent Pro', sans-serif`,
    },
    components: {
      Button,
    },
  },
  withDefaultColorScheme({ colorScheme: 'brand' })
);

export default theme;
