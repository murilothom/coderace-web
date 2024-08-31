import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const PublicLayout = () => {
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        background: theme.palette.background.fade,
        backgroundBlendMode: 'overlay',
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        gridTemplateColumns: mdDown ? '1fr' : 'minmax(300px, 34rem) 1fr',
      }}
    >
      <Box
        sx={{
          width: '100vw',
          minHeight: '100vh',
          height: '100%',
          maxWidth: mdDown ? '100%' : '34rem',
        }}
      >
        <Outlet />
      </Box>

      {!mdDown && (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            padding: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              mt: lgDown ? 2 : 8,
              ml: lgDown ? 2 : 8,
            }}
          >
            <Typography
              variant="h1"
              fontSize={lgDown ? '4.75rem' : '6rem'}
              fontWeight={500}
              color={theme.palette.primary.contrastText}
            >
              EMP Soluções
            </Typography>
            <Typography
              variant="h5"
              fontSize={lgDown ? '1.125rem' : '1.5rem'}
              fontWeight={300}
              color={theme.palette.primary.contrastText}
            >
              Registros de pontos e gestão de colaboradores
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
