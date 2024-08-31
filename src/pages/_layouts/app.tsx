import { Box, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { useEmployeeContext } from '../../shared/contexts/employee-context';
import { Role } from '../../shared/types/Employee';
import { Header } from './components/header';

export const AppLayout = () => {
  const { employee } = useEmployeeContext();
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
            marginLeft: {
              sm:
                employee && [Role.ADMIN, Role.OWNER].includes(employee?.role)
                  ? '108px'
                  : '42px',
              xs: '16px',
            },
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
