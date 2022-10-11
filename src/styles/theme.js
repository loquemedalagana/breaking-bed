import { createTheme } from '@mui/material/styles';

const MuiTheme = createTheme({
  breakpoints: {
    values: {
      sm: 375,
      md: 768,
      lg: 1280,
    },
  },
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#87A2FB',
      contrastText: '#FFF5E4',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#ECC5FB',
      contrastText: '#FFF5E4',
    },
  },
});

export default MuiTheme;
