import { Feedback, Person } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
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
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { Logo } from './logo';

type Page = {
  id: number;
  title: string;
  icon: JSX.Element;
  to: string;
};

const pages: Page[] = [
  {
    id: 1,
    title: 'Colaboradores',
    icon: <Person fontSize="medium" />,
    to: '/colaboradores',
  },
  {
    id: 2,
    title: 'Feedbacks',
    icon: <Feedback fontSize="medium" />,
    to: '/feedbacks',
  },
];

export const DrawerMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleNavigate = (page: Page) => {
    setOpen(false);
    navigate(page.to);
  };

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
                onClick={() => handleNavigate(page)}
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
