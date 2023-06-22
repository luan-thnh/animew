import { createTheme } from '@mui/material/styles';
import { appBlack, appBlue, appRed } from 'constants/colors';

// Tạo theme mới với màu chủ đạo là màu đen
const theme = createTheme({
  palette: {
    primary: {
      main: appRed[600],
    },
    text: {
      primary: appBlack[0],
    },
    white: {
      main: '#ffffff',
    },
    blue: {
      main: appBlue[500],
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    white: Palette['primary'];
    blue: Palette['primary'];
  }

  interface PaletteOptions {
    white?: PaletteOptions['primary'];
    blue?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    white: true;
    blue: true;
  }
}

export default theme;
