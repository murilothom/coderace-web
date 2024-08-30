import { Box, Paper, Typography } from '@mui/material';
import { Link, useRouteError } from 'react-router-dom';

export const Error = () => {
  const error = useRouteError() as Error;

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '-100px',
        background: '#F9F9F9',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '600px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ width: '100%', textAlign: 'left' }} variant="h1">
          Aconteceu algum erro...
        </Typography>
        <Typography
          sx={{ width: '100%', textAlign: 'left' }}
          variant="subtitle1"
        >
          Abaixo você encontra mais detalhes:
        </Typography>
        <Box component={Paper} sx={{ padding: '20px 40px', margin: '15px 0' }}>
          <pre>{error?.message || JSON.stringify(error)}</pre>
        </Box>
        <Typography
          sx={{ width: '100%', textAlign: 'left' }}
          variant="subtitle2"
        >
          Voltar para a <Link to="/">página inicial</Link>
        </Typography>
      </Box>
    </Box>
  );
};