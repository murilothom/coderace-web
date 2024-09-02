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
import Checkbox from '@mui/material/Checkbox';
import { isAxiosError } from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useAlertContext } from '../../shared/contexts/alert-context';
import {
  CreateEnterpriseSchema,
  createEnterpriseSchema,
} from '../../shared/schemas/create-enterprise-schema';
import enterprisesService from '../../shared/services/enterprise-service';

type PassVisibility = { password: boolean; confirmPassword: boolean };

export const SignUp = () => {
  const [acceptTermsAndPrivacyPolicy, setAcceptTermsAndPrivacyPolicy] =
    useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState<PassVisibility>({
    password: false,
    confirmPassword: false,
  });
  const { showAlert } = useAlertContext();
  const navigate = useNavigate();

  const handleGoToSignIn = () => {
    navigate('/entrar');
  };

  const togglePasswordVisibility = (key: keyof PassVisibility) => {
    setPasswordVisibility((state) => ({ ...state, [key]: !state[key] }));
  };

  const formik = useFormik<CreateEnterpriseSchema>({
    initialValues: {
      name: '',
      email: '',
      document: '',
      enterpriseName: '',
      sector: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (data) => {
      try {
        await enterprisesService.create({
          name: data.name.trim(),
          email: data.email.trim(),
          password: data.password,
          confirmPassword: data.confirmPassword,
          document: data.document.trim(),
          enterpriseName: data.enterpriseName.trim(),
          sector: data.sector.trim(),
        });
        navigate(`/entrar?email=${data.email.trim()}`);
        showAlert('Empresa criada com sucesso!', 'success');
      } catch (error) {
        if (isAxiosError(error)) {
          showAlert(error?.response?.data?.message, 'error');
        }
      }
    },
    validationSchema: createEnterpriseSchema,
  });

  return (
    <>
      <Helmet title="Criar empresa" />

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
          mt={10}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Grid position="absolute" top={32} left={32}>
            <Typography variant="h4" fontWeight={300}>
              Cadastrar empresa
            </Typography>
          </Grid>
          <Grid size={12}>
            <TextField
              id="name"
              name="name"
              value={formik.values.name ?? ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Nome *"
              fullWidth
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
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
              id="sector"
              name="sector"
              value={formik.values.sector ?? ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Setor do responsável*"
              fullWidth
              error={formik.touched.sector && Boolean(formik.errors.sector)}
              helperText={formik.touched.sector && formik.errors.sector}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              id="enterpriseName"
              name="enterpriseName"
              value={formik.values.enterpriseName ?? ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Nome da empresa *"
              fullWidth
              error={
                formik.touched.enterpriseName &&
                Boolean(formik.errors.enterpriseName)
              }
              helperText={
                formik.touched.enterpriseName && formik.errors.enterpriseName
              }
            />
          </Grid>
          <Grid size={12}>
            <TextField
              id="document"
              name="document"
              value={formik.values.document ?? ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="CNPJ *"
              fullWidth
              error={formik.touched.document && Boolean(formik.errors.document)}
              helperText={formik.touched.document && formik.errors.document}
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
              fullWidth
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              type={passwordVisibility.password ? 'text' : 'password'}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton
                      onClick={() => togglePasswordVisibility('password')}
                    >
                      {passwordVisibility.password ? (
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

          <Grid
            display="flex"
            justifyItems="center"
            alignItems="center"
            gap={1}
          >
            <Checkbox
              value={acceptTermsAndPrivacyPolicy}
              onChange={(_, checked) => setAcceptTermsAndPrivacyPolicy(checked)}
              size="small"
              sx={{
                padding: 0,
                color: (theme) => theme.palette.primary.main,
              }}
            />
            <Typography fontSize={14}>
              Li e estou de acordo com os{' '}
              <Link to="/termos-de-uso" component={RouterLink}>
                termos de uso
              </Link>{' '}
              e{' '}
              <Link to="/politica-de-privacidade" component={RouterLink}>
                política de privacidade
              </Link>
              .
            </Typography>
          </Grid>

          <Grid size={12}>
            <Button
              variant="contained"
              type="submit"
              size="large"
              fullWidth
              disabled={formik.isSubmitting || !acceptTermsAndPrivacyPolicy}
            >
              {formik.isSubmitting ? (
                <CircularProgress color="inherit" size={26} />
              ) : (
                'Cadastrar'
              )}
            </Button>
          </Grid>

          <Grid size={12}>
            <Divider />
          </Grid>

          <Grid size={12}>
            <Button
              variant="outlined"
              type="button"
              size="large"
              fullWidth
              onClick={handleGoToSignIn}
            >
              Já possuo uma conta
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
