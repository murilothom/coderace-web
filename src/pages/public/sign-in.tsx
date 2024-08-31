import {
  RemoveRedEyeOutlined,
  VisibilityOffOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid2 as Grid,
  IconButton,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { isAxiosError } from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAlertContext } from '../../shared/contexts/alert-context';
import { useEmployeeContext } from '../../shared/contexts/employee-context';
import {
  type SignInSchema,
  signInSchema,
} from '../../shared/schemas/sign-in-schema';
import authService from '../../shared/services/auth-service';

export const SignIn = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';

  const { showAlert } = useAlertContext();
  const navigate = useNavigate();
  const { fetchEmployee } = useEmployeeContext();

  const handleGoToSignUp = () => {
    navigate('/cadastrar');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility((state) => !state);
  };

  const formik = useFormik<SignInSchema>({
    initialValues: {
      email,
      password: '',
    },
    onSubmit: async (data) => {
      try {
        await authService.login(data);
        await fetchEmployee();
        navigate('/');
        showAlert('Login efetuado com sucesso!', 'success');
      } catch (error) {
        if (isAxiosError(error)) {
          showAlert(error?.response?.data?.message, 'error');
        }
      }
    },
    validationSchema: signInSchema,
  });

  return (
    <>
      <Helmet title="Entrar" />

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
              Entrar
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
            <TextField
              id="password"
              name="password"
              value={formik.values.password ?? ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Senha *"
              type={passwordVisibility ? 'text' : 'password'}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton onClick={togglePasswordVisibility}>
                      {passwordVisibility ? (
                        <VisibilityOffOutlined />
                      ) : (
                        <RemoveRedEyeOutlined />
                      )}
                    </IconButton>
                  ),
                },
              }}
              fullWidth
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>

          <Grid size={12} sx={{ mt: '-8px' }}>
            <Link
              component={RouterLink}
              to="/recuperar-senha"
              underline="hover"
            >
              Esqueci minha senha
            </Link>
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
                'Entrar'
              )}
            </Button>
          </Grid>

          <Grid size={12}>
            <Divider />
          </Grid>

          <Grid size={12}>
            <Button
              variant="outlined"
              onClick={handleGoToSignUp}
              size="large"
              fullWidth
            >
              Cadastrar empresa
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
