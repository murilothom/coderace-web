import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Logo } from './logo';

const pages = [
  {
    id: 1,
    title: 'Menu 1',
    icon: <InboxIcon fontSize="medium" />,
    to: '/menu-1',
  },
  {
    id: 2,
    title: 'Menu 2',
    icon: <InboxIcon fontSize="medium" />,
    to: '/menu-2',
  },
  {
    id: 3,
    title: 'Menu 3',
    icon: <InboxIcon fontSize="medium" />,
    to: '/menu-3',
  },
];

export const DrawerMenu = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton
        aria-haspopup="true"
        onClick={open ? handleDrawerClose : handleDrawerOpen}
        color="inherit"
        size="medium"
      >
        <MenuIcon fontSize="medium" />
      </IconButton>

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

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          display: { sm: 'flex', xs: 'flex' },
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'column',
          width: open ? 220 : 65,
          transition: 'width 0.3s ease',
          position: 'fixed',
          '.MuiPaper-root': {
            mt: { sm: '64px', xs: '55px' },
            width: { sm: open ? 220 : 65, xs: open ? '100%' : 0 },
            background: {
              sm: theme.palette.background.fade,
              xs: theme.palette.primary.dark,
            },
            transition: 'width 0.3s ease, background 0.3s ease',
          },
        }}
      >
        <List>
          {pages.map((page) => (
            <ListItem key={page.id} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={RouterLink}
                to={page.to}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                      color: theme.palette.primary.contrastText,
                    },
                    {
                      mr: 3,
                    },
                  ]}
                >
                  {page.icon}
                </ListItemIcon>
                {open && (
                  <Typography
                    color={theme.palette.primary.contrastText}
                    sx={{
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {page.title}
                  </Typography>
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};