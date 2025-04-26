// src/theme.js

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: '#CC0000',  // Warna merah
    secondary: '#943232',  // Warna biru tua (untuk text, icon)
    background: '#F4F6F7',  // Warna latar belakang (putih krem)
    accent: '#00A8E8',  // Warna biru terang (untuk highlight)
    text: '#333333',  // Warna teks utama
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'md',
      },
      sizes: {
        lg: {
          height: '50px',
          fontSize: '18px',
        },
      },
      variants: {
        solid: {
          bg: 'primary',
          color: 'white',
          _hover: {
            bg: 'secondary',
          },
          _active: {
            bg: 'accent',
          },
        },
        outline: {
          borderColor: 'primary',
          color: 'primary',
          _hover: {
            borderColor: 'secondary',
            color: 'secondary',
          },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: 'md',
          bg: 'white',
          borderColor: 'gray.300',
          _hover: {
            borderColor: 'primary',
          },
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          bg: 'white',
          borderRadius: 'md',
        },
      },
    },
  },
});

export default theme;
