import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { useEmployeeContext } from '../../../shared/contexts/employee-context';
import { Role } from '../../../shared/types/Employee';
import { AvatarMenu } from './avatar-menu';
import { DrawerMenu } from './drawer-menu';
import { Logo } from './logo';

export const Header = () => {
  const { employee } = useEmployeeContext();
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: {
          sm: theme.palette.background.fade,
          xs: theme.palette.primary.dark,
        },
        '.MuiContainer-root': { pl: '12px', maxWidth: 'none' },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {employee && [Role.ADMIN, Role.OWNER].includes(employee?.role) ? (
            <DrawerMenu />
          ) : (
            <Typography
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                color: theme.palette.primary.contrastText,
                textDecoration: 'none',
                ml: { sm: '12px', xs: '6px' },
                display: 'flex',
              }}
            >
              <Logo />
            </Typography>
          )}

          <AvatarMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
