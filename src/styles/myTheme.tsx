import { createTheme } from '@mui/material/styles';

const MyTheme = createTheme({
  palette: {
    primary: {
      main: '#3964B2',
    },
  },
  typography: {
    body1: {
      fontSize: '1.4rem',
      '@media (min-width:911px)': {
        fontSize: '1.6rem',
      },
    },
    h2: {
      textAlign: 'center',
      fontSize: '3rem',
      margin: '2rem 0',
      fontWeight: 'bold',
      '@media (min-width:911px)': {
        fontSize: '4rem',
        margin: '3rem 0',
      },
    },
    button: {
      fontSize: '1.4rem',
      '@media (min-width:911px)': {
        fontSize: '1.6rem',
      },
    },
  },
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
          '@media (min-width:911px)': {
            fontSize: '1.6rem',
          },
        },
      },
    },
  },
});

export default MyTheme;
