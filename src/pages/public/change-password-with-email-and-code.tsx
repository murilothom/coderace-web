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
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { isAxiosError } from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import { useAlertContext } from '../../shared/contexts/alert-context';
import {
  type ChangePasswordSchema,
  changePasswordSchema,
} from '../../shared/schemas/change-password-schema';
import authService from '../../shared/services/auth-service';

type PassVisibility = { newPassword: boolean; confirmPassword: boolean };

export const ChangePasswordWithEmailAndCode = () => {
  const [passwordVisibility, setPasswordVisibility] = useState<PassVisibility>({
    newPassword: false,
    confirmPassword: false,
  });
  const { showAlert } = useAlertContext();
  const navigate = useNavigate();
  const { code, email } = useParams<string>();

  const handleGoToSignIn = () => {
    navigate('/entrar');
  };

  const togglePasswordVisibility = (key: keyof PassVisibility) => {
    setPasswordVisibility((state) => ({ ...state, [key]: !state[key] }));
  };

  const formik = useFormik<ChangePasswordSchema>({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    onSubmit: async (data) => {
      try {
        await authService.changePasswordByEmail(code!, email!, data);
        navigate(`/entrar?email=${email}`);
        showAlert('Senha redefinida com sucesso!', 'success');
      } catch (error) {
        if (isAxiosError(error)) {
          showAlert(error?.response?.data?.message, 'error');
        }
      }
    },
    validationSchema: changePasswordSchema,
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
              Redefinir senha
            </Typography>
          </Grid>
          <Grid size={12}>
            <TextField
              id="newPassword"
              name="newPassword"
              value={formik.values.newPassword ?? ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Senha *"
              fullWidth
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
              type={passwordVisibility.newPassword ? 'text' : 'password'}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton
                      onClick={() => togglePasswordVisibility('newPassword')}
                    >
                      {passwordVisibility.newPassword ? (
                        <VisibilityOffOutlined />
                      ) : (
                        <RemoveRedEyeOutlined />
                      )}
                    </IconButton>
                  ),
                },
              }}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword ?? ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Confirmar senha *"
              fullWidth
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              type={passwordVisibility.confirmPassword ? 'text' : 'password'}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton
                      onClick={() =>
                        togglePasswordVisibility('confirmPassword')
                      }
                    >
                      {passwordVisibility.confirmPassword ? (
                        <VisibilityOffOutlined />
                      ) : (
                        <RemoveRedEyeOutlined />
                      )}
                    </IconButton>
                  ),
                },
              }}
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
