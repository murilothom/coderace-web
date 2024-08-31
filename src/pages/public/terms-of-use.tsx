import {
  Box,
  Divider,
  Grid2 as Grid,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';

export const TermsOfUse = () => {
  return (
    <>
      <Helmet title="Termos de Uso" />

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
              Termos de Uso
            </Typography>
          </Grid>
          <Grid size={12} sx={{ mt: 4 }}>
            <Typography variant="body1">
              Bem-vindo aos nossos Termos de Uso. Ao utilizar nossos serviços,
              você concorda com os seguintes termos.
            </Typography>
          </Grid>
          <Grid size={12} sx={{ mt: 2 }}>
            <Typography variant="h6" fontWeight={500}>
              Uso dos Nossos Serviços
            </Typography>
            <Typography variant="body2">
              Ao utilizar nossos serviços, você concorda em cumprir todas as
              leis e regulamentos aplicáveis. Você não pode utilizar nossos
              serviços para qualquer finalidade ilegal ou não autorizada.
            </Typography>
          </Grid>
          <Grid size={12} sx={{ mt: 2 }}>
            <Typography variant="h6" fontWeight={500}>
              Conteúdo do Colaborador
            </Typography>
            <Typography variant="body2">
              Você é responsável por todo o conteúdo que criar, enviar, publicar
              ou exibir ao usar nossos serviços. Nós não endossamos, apoiamos,
              representamos ou garantimos a veracidade, exatidão ou
              confiabilidade de qualquer conteúdo publicado por meio de nossos
              serviços.
            </Typography>
          </Grid>
          <Grid size={12} sx={{ mt: 2 }}>
            <Typography variant="h6" fontWeight={500}>
              Modificações dos Serviços
            </Typography>
            <Typography variant="body2">
              Reservamo-nos o direito de modificar ou descontinuar nossos
              serviços a qualquer momento, com ou sem aviso prévio. Não seremos
              responsáveis por qualquer modificação, suspensão ou interrupção
              dos serviços.
            </Typography>
          </Grid>
          <Grid size={12} sx={{ mt: 2 }}>
            <Typography variant="h6" fontWeight={500}>
              Limitação de Responsabilidade
            </Typography>
            <Typography variant="body2">
              Na medida máxima permitida pela lei aplicável, em nenhuma
              circunstância seremos responsáveis por quaisquer danos indiretos,
              incidentais, especiais, consequenciais ou punitivos, ou qualquer
              perda de lucros ou receitas.
            </Typography>
          </Grid>
          <Grid size={12} sx={{ mt: 2 }}>
            <Typography variant="h6" fontWeight={500}>
              Alterações aos Termos
            </Typography>
            <Typography variant="body2">
              Podemos revisar estes Termos de Uso de tempos em tempos. A versão
              mais atual dos termos regerá o uso dos nossos serviços e estará
              sempre disponível em nosso site.
            </Typography>
          </Grid>
          <Grid size={12}>
            <Divider />
          </Grid>
          <Grid size={12}>
            <Typography variant="body2">
              Se você tiver dúvidas ou preocupações sobre nossos Termos de Uso,{' '}
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
