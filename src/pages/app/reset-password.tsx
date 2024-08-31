import {
  Home,
  RemoveRedEyeOutlined,
  Settings,
  VisibilityOffOutlined,
} from '@mui/icons-material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {
  Button,
  Grid2,
  IconButton,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import { isAxiosError } from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Breadcrumbs, { Breadcrumb } from '../../shared/components/breadcrumbs';
import { useAlertContext } from '../../shared/contexts/alert-context';
import { useEmployeeContext } from '../../shared/contexts/employee-context';
import {
  type ResetPasswordSchema,
  resetPasswordSchema,
} from '../../shared/schemas/reset-password-schema';
import employeesService from '../../shared/services/employee-service';

const breadcrumbs: Breadcrumb[] = [
  {
    text: 'Página inicial',
    href: '/',
    icon: Home,
  },
  {
    text: 'Configurações',
    href: '/configuracoes',
    icon: Settings,
  },
  {
    text: 'Redefinir senha',
    href: '/configuracoes/redefinir-senha',
    icon: VpnKeyIcon,
  },
];

type PassVisibility = {
  password: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
};

export const ResetPassword = () => {
  const [passwordVisibility, setPasswordVisibility] = useState<PassVisibility>({
    password: false,
    newPassword: false,
    confirmPassword: false,
  });
  const { isFetchingEmployee } = useEmployeeContext();
  const { showAlert } = useAlertContext();

  const togglePasswordVisibility = (key: keyof PassVisibility) => {
    setPasswordVisibility((state) => ({ ...state, [key]: !state[key] }));
  };

  const formik = useFormik<ResetPasswordSchema>({
    initialValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (data) => {
      try {
        await employeesService.updatePassword(data);
        showAlert('Senha redefinida com sucesso!', 'success');
      } catch (error) {
        if (isAxiosError(error)) {
          showAlert(error?.response?.data?.message, 'error');
        }
      }
    },
  });

  return (
    <Grid2
      container
      size={12}
      spacing={2}
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <Helmet title="Redefinir senha" />

      <Grid2 size={12} mb={2}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Typography variant="h6" fontWeight={500}>
          Redefinir senha
        </Typography>
      </Grid2>
      <Grid2 container size={12} mt={2}>
        <Grid2 size={{ xs: 12 }}>
          {!isFetchingEmployee && (
            <TextField
              id="password"
              name="password"
              value={formik.values.password ?? ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Senha atual *"
              fullWidth
              type={passwordVisibility.password ? 'text' : 'password'}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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
          )}
          {isFetchingEmployee && (
            <Skeleton variant="rounded" width="100%" height="54px" />
          )}
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          {!isFetchingEmployee && (
            <TextField
              id="newPassword"
              name="newPassword"
              value={formik.values.newPassword ?? ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Nova senha *"
              fullWidth
              type={passwordVisibility.newPassword ? 'text' : 'password'}
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
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
          )}
          {isFetchingEmployee && (
            <Skeleton variant="rounded" width="100%" height="54px" />
          )}
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          {!isFetchingEmployee && (
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword ?? ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Confirme a nova senha *"
              fullWidth
              type={passwordVisibility.confirmPassword ? 'text' : 'password'}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
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
          )}
          {isFetchingEmployee && (
            <Skeleton variant="rounded" width="100%" height="54px" />
          )}
        </Grid2>
      </Grid2>

      <Grid2
        size={12}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          type="submit"
          disabled={formik.isSubmitting}
        >
          Salvar
        </Button>
      </Grid2>
    </Grid2>
  );
};
