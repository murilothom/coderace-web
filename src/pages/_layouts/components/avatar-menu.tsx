import { Logout, Person, Settings } from '@mui/icons-material';
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useEmployeeContext } from '../../../shared/contexts/employee-context';

const settings = [
  {
    id: 1,
    label: 'Perfil',
    icon: <Person color="primary" sx={{ mr: 1 }} />,
    path: '/perfil',
  },
  {
    id: 2,
    label: 'Configurações',
    icon: <Settings color="primary" sx={{ mr: 1 }} />,
    path: '/configuracoes',
  },
  {
    id: 3,
    label: 'Sair',
    icon: <Logout color="primary" sx={{ mr: 1 }} />,
    path: '/sair',
  },
];

export const AvatarMenu = () => {
  const { employee, isFetchingEmployee } = useEmployeeContext();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickMenu = (path?: string) => {
    if (path) {
      navigate(path);
    }
    handleCloseUserMenu();
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
      <IconButton size="small" onClick={handleOpenUserMenu}>
        <Avatar alt="Foto do colaborador">{employee?.name?.charAt(0)}</Avatar>
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem
            key={setting.id}
            onClick={() => handleClickMenu(setting.path)}
            sx={{ minWidth: 140 }}
          >
            <Typography sx={{ textAlign: 'left' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {setting.icon}
                <Typography fontSize={14} fontWeight={400}>
                  {setting.label}
                </Typography>
              </Box>
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
