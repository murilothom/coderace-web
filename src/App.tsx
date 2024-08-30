import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { Router } from './routes/router';
import { theme } from './styles/themes/default';
import { AlertProvider } from './shared/contexts/alert-context';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AlertProvider>
        <HelmetProvider>
          <Helmet titleTemplate="%s | EMP Soluções" />
          <Router />
        </HelmetProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;