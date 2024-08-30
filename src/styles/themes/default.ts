import { createTheme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    fade?: string;
  }
}

const defaultTheme: ThemeOptions = {
  palette: {
    primary: {
      main: '#7e61e4',
      dark: '#4533c9',
      light: '#b68eff',
      contrastText: '#ffffff',
    },
    error: {
      main: '#f50000',
      dark: '#ab0000',
      light: '#ff4d4d',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ffac33',
      dark: '#b26a00',
      light: '#ff9800',
      contrastText: '#ffffff',
    },
    success: {
      main: '#33b673',
      dark: '#007238',
      light: '#00a451',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f8f8',
      paper: '#ffffff',
      fade: 'linear-gradient(135deg, #4533c9, #7e61e4),radial-gradient(circle at top left, #4533c9, transparent 50%), radial-gradient(circle at bottom right, #7e61e4, transparent 50%)',
    },
    info: {
      main: '#018781',
      dark: '#005e5a',
      light: '#339f9a',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    allVariants: {
      color: '#333333',
    },
  },
} as const;

export const theme = createTheme(defaultTheme);
