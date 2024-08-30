import { Box, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Header } from './components/header';

export const AppLayout = () => {
  return (
    <Box>
      <Header />

      <Box
        sx={{
          width: '100%',
          height: { sm: 'calc(100% - 128px)', xs: 'calc(100% - 100px)' },
          mt: { sm: '96px', xs: '88px' },
        }}
      >
        <Box
          sx={{
            height: '100%',
            marginLeft: { sm: '108px', xs: '16px' },
            marginRight: { sm: '42px', xs: '16px' },
            my: '34px',
          }}
        >
          <Box
            component={Paper}
            sx={{
              width: '100%',
              maxWidth: '1440px',
              margin: '0 auto',
              padding: '24px 32px',
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};