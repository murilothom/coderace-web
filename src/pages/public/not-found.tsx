import { Box, Link, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';

export const NotFound = () => {
  return (
    <Box sx={{ height: '100vh' }}>
      <Helmet title="Página não encontrada" />

      <Box
        sx={{
          maxWidth: { xs: '90%', sm: '40rem' }, 
          margin: 'auto',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: { xs: 2, sm: 4 }, 
        }}
      >
        <Typography
          variant="h2"
          fontWeight={500}
          textAlign="center" 
          sx={{
            fontSize: { xs: '1.5rem', sm: '2.5rem' }, 
            mb: 2, 
          }}
        >
          Oops! Parece que a página que você tentou acessar não existe.
        </Typography>
        <Typography
          variant="h6"
          fontWeight={400}
          textAlign="center" 
          width="100%"
          sx={{
            fontSize: { xs: '1rem', sm: '1.25rem' }, 
            mt: 2, 
          }}
        >
          Voltar para a{' '}
          <Link component={RouterLink} to="/">
            página inicial
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};