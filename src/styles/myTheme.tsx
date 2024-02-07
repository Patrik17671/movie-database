import { createTheme } from '@mui/material/styles';

const MyTheme = createTheme({
  palette: {
    primary: {
      main: '#3964B2',
      dark: '#242424',
    },
  },
  typography: {
    body1: {
      fontSize: '1.4rem',
      '@media (min-width:911px)': {
        fontSize: '1.6rem',
      },
    },
    body2: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      '@media (min-width:911px)': {
        fontSize: '1.4rem',
      },
    },
    subtitle1: {
      fontSize: '1.4rem',
      color: '#000',
      fontWeight: 'bold',
    },
    subtitle2: {
      fontSize: '1.4rem',
      color: '#242424',
      fontWeight: 'bold',
    },
    h1: {
      textAlign: 'center',
      color: '#3964B2',
      fontSize: '3rem',
      margin: '2rem 0',
      fontWeight: 'bold',
      '@media (min-width:911px)': {
        fontSize: '5rem',
        margin: '3rem 0',
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
    h3: {
      color: '#3964B2',
      fontWeight: 'bold',
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
