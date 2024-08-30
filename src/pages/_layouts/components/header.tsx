import { AppBar, Container, Toolbar, useTheme } from '@mui/material';

// import { AvatarMenu } from './avatar-menu';
import { DrawerMenu } from './drawer-menu';

export const Header = () => {
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
          <DrawerMenu />

          {/* <AvatarMenu /> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};