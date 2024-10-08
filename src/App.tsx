import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { LicenseInfo } from '@mui/x-data-grid-pro';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { Router } from './routes/router';
import { AlertProvider } from './shared/contexts/alert-context';
import { theme } from './styles/themes/default';

function App() {
  LicenseInfo.setLicenseKey(import.meta.env.VITE_LICENSE_KEY);

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
