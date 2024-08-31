import { Home, Settings } from '@mui/icons-material';
import {
  Button,
  Grid2,
  Link,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import { isAxiosError } from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';

import type { Breadcrumb } from '../../shared/components/breadcrumbs';
import Breadcrumbs from '../../shared/components/breadcrumbs';
import { useAlertContext } from '../../shared/contexts/alert-context';
import { useEmployeeContext } from '../../shared/contexts/employee-context';
import {
  SaveEmployeeSchema,
  saveEmployeeSchema,
} from '../../shared/schemas/save-employee-schema';
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
];

export const EmployeeData = () => {
  const { isFetchingEmployee, employee } = useEmployeeContext();
  const [name, setName] = useState('...');
  const { showAlert } = useAlertContext();

  const formik = useFormik<SaveEmployeeSchema>({
    initialValues: {
      name: '',
      email: '',
      role: '',
      sector: '',
    },
    validationSchema: saveEmployeeSchema,
    onSubmit: async (data) => {
      try {
        await employeesService.update(employee!.id, {
          email: data.email.trim(),
          name: data.name.trim(),
          role: data.role.trim(),
          sector: data.sector.trim(),
        });
        showAlert('Seus dados foram atualizados com sucesso!', 'success');
        setName(data.name.trim());
      } catch (error) {
        if (isAxiosError(error)) {
          showAlert(error?.response?.data?.message, 'error');
        }
      }
    },
  });

  useEffect(() => {
    if (employee) {
      formik.setValues(employee);
      setName(employee.name);
    }
  }, [employee]);

  return (
    <Grid2
      container
      size={12}
      spacing={2}
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <Helmet title="Configurações" />

      <Grid2 size={12} mb={2}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Typography variant="h6" fontWeight={500}>
          Olá, {name}
        </Typography>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Link
          underline="hover"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'flex-start', md: 'flex-end' },
            textDecoration: 'underline',
          }}
          color="text.primary"
          to="/configuracoes/redefinir-senha"
          component={RouterLink}
        >
          Redefinir senha
        </Link>
      </Grid2>
      <Grid2 container size={12} mt={2}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          {!isFetchingEmployee && (
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
          )}
          {isFetchingEmployee && (
            <Skeleton variant="rounded" width="100%" height="54px" />
          )}
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          {!isFetchingEmployee && (
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
