// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react';

// 2. Add your color mode config
const customStyles = {
  components: {
    Select: {
      baseStyle: {
        control: {
          background: 'gray.100',
          borderColor: 'gray.500',
        },
        menu: {
          background: 'gray.200',
        },
      },
    },
  },
};

// 3. extend the theme
const theme = extendTheme(customStyles);

export default theme;
