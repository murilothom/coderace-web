import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid2 as Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { isAxiosError } from 'axios';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import { useAlertContext } from '../../shared/contexts/alert-context';
import {
  RecoverPasswordByEmailSchema,
  recoverPasswordByEmailSchema,
} from '../../shared/schemas/recover-password-by-email-schema';
import authService from '../../shared/services/auth-service';

export const RecoverPasswordByEmail = () => {
  const { showAlert } = useAlertContext();
  const navigate = useNavigate();

  const handleGoToSignIn = () => {
    navigate('/entrar');
  };

  const formik = useFormik<RecoverPasswordByEmailSchema>({
    initialValues: {
      email: '',
    },
    onSubmit: async (data) => {
      try {
        await authService.recoverPasswordByEmail(data);
        showAlert(
          'Enviamos um link por e-mail para você redefinir sua senha.',
          'success',
        );
      } catch (error) {
        if (isAxiosError(error)) {
          showAlert(error?.response?.data?.message, 'error');
        }
      }
    },
    validationSchema: recoverPasswordByEmailSchema,
  });

  return (
    <>
      <Helmet title="Recuperar senha" />

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
        <Grid
          container
          sx={{ width: '100%' }}
          spacing={2}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Grid position="absolute" top={32} left={32}>
            <Typography variant="h4" fontWeight={300}>
              Recuperar senha
            </Typography>
          </Grid>
          <Grid size={12}>
            <TextField
              id="email"
              name="email"
              value={formik.values.email ?? ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="E-mail *"
              fullWidth
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          <Grid size={12}>
            <Button
              variant="contained"
              type="submit"
              size="large"
              fullWidth
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <CircularProgress color="inherit" size={26} />
              ) : (
                'Enviar'
              )}
            </Button>
          </Grid>

          <Grid size={12}>
            <Divider />
          </Grid>

          <Grid size={12}>
            <Button
              variant="outlined"
              onClick={handleGoToSignIn}
              size="large"
              fullWidth
            >
              Voltar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
