import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a1a1a',
      light: '#333333',
      dark: '#000000',
    },
    secondary: {
      main: '#ce93d8', // Light lilac
      light: '#e1bee7', // Very light lilac
      dark: '#ab47bc', // Medium lilac
    },
  },
});

export default theme; 