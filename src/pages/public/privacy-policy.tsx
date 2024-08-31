import {
  Box,
  Divider,
  Grid2 as Grid,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';

export const PrivacyPolicy = () => {
  return (
    <>
      <Helmet title="Política de Privacidade" />

      <Box
        sx={{
          width: '100%',
          height: '100%',
          padding: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
        component={Paper}
      >
        <Grid container sx={{ width: '100%' }} spacing={2}>
          <Grid position="absolute" top={32} left={32}>
            <Typography variant="h4" fontWeight={300}>
              Política de Privacidade
            </Typography>
          </Grid>
          <Grid size={12} sx={{ mt: 4 }}>
            <Typography variant="body1">
              Bem-vindo à nossa Política de Privacidade. Sua privacidade é muito
              importante para nós.
            </Typography>
          </Grid>
          <Grid size={12} sx={{ mt: 2 }}>
            <Typography variant="h6" fontWeight={500}>
              Coleta de Informações
            </Typography>
            <Typography variant="body2">
              Nós coletamos informações que você nos fornece diretamente, como
              seu nome, endereço de e-mail, e outras informações que você decide
              fornecer.
            </Typography>
          </Grid>
          <Grid size={12} sx={{ mt: 2 }}>
            <Typography variant="h6" fontWeight={500}>
              Uso de Informações
            </Typography>
            <Typography variant="body2">
              Utilizamos as informações coletadas para fornecer, manter,
              proteger e melhorar nossos serviços, bem como desenvolver novos.
            </Typography>
          </Grid>
          <Grid size={12} sx={{ mt: 2 }}>
            <Typography variant="h6" fontWeight={500}>
              Compartilhamento de Informações
            </Typography>
            <Typography variant="body2">
              Não compartilhamos suas informações pessoais com empresas,
              organizações e indivíduos externos, exceto nas seguintes
              circunstâncias: (a) Com seu consentimento; (b) Para processamento
              externo; (c) Por razões legais.
            </Typography>
          </Grid>
          <Grid size={12} sx={{ mt: 2 }}>
            <Typography variant="h6" fontWeight={500}>
              Segurança das Informações
            </Typography>
            <Typography variant="body2">
              Trabalhamos arduamente para proteger nossas informações de acesso
              não autorizado, alteração, divulgação ou destruição.
            </Typography>
          </Grid>
          <Grid size={12} sx={{ mt: 2 }}>
            <Typography variant="h6" fontWeight={500}>
              Alterações
            </Typography>
            <Typography variant="body2">
              Nossa Política de Privacidade pode mudar de tempos em tempos.
              Publicaremos quaisquer alterações de política nesta página.
            </Typography>
          </Grid>
          <Grid size={12}>
            <Divider />
          </Grid>
          <Grid size={12}>
            <Typography variant="body2">
              Se você tiver dúvidas ou preocupações sobre nossa Política de
              Privacidade,{' '}
              <Link href="mailto:empsolucoes.2024@gmail.com">
                entre em contato conosco
              </Link>
              .
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
