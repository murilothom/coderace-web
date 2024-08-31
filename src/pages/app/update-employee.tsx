import { Edit, Home, Person, PersonAdd, Settings } from '@mui/icons-material';
import {
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
} from '@mui/material';
import { isAxiosError } from 'axios';
import { useFormik } from 'formik';
import { useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import type { Breadcrumb } from '../../shared/components/breadcrumbs';
import Breadcrumbs from '../../shared/components/breadcrumbs';
import { useAlertContext } from '../../shared/contexts/alert-context';
import { useEmployeeContext } from '../../shared/contexts/employee-context';
import {
  SaveEmployeeSchema,
  saveEmployeeSchema,
} from '../../shared/schemas/save-employee-schema';
import employeesService from '../../shared/services/employee-service';
import { Role } from '../../shared/types/Employee';

const breadcrumbs: Breadcrumb[] = [
  {
    text: 'Página inicial',
    href: '/',
    icon: Home,
  },
  {
    text: 'Colaboradores',
    href: '/colaboradores',
    icon: Person,
  },
  {
    text: 'Editar colaborador',
    href: '/colaboradores/:id',
    icon: Edit,
  },
];

export const UpdateEmployee = () => {
  const { isFetchingEmployee } = useEmployeeContext();
  const { showAlert } = useAlertContext();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const formik = useFormik<SaveEmployeeSchema>({
    initialValues: {
      name: '',
      email: '',
      role: Role.EMPLOYEE,
      sector: '',
    },
    validationSchema: saveEmployeeSchema,
    onSubmit: async (data) => {
      try {
        await employeesService.create({
          email: data.email.trim(),
          name: data.name.trim(),
          role: data.role.trim(),
          sector: data.sector.trim(),
        });
        showAlert(
          'Colaborador criado com sucesso! A senha foi enviada para o e-mail registrado.',
          'success',
        );
        navigate('/colaboradores');
      } catch (error) {
        if (isAxiosError(error)) {
          showAlert(error?.response?.data?.message, 'error');
        }
      }
    },
  });

  const getEmployee = useCallback(async () => {
    try {
      const response = await employeesService.getEmployeeById(id!);
      formik.setValues({
        email: response.email,
        name: response.name,
        role: response.role,
        sector: response.sector,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        showAlert(error?.response?.data?.message, 'error');
      }
    }
  }, [id]);

  useEffect(() => {
    getEmployee();
  }, [getEmployee]);

  return (
    <Grid2
      container
      size={12}
      spacing={2}
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <Helmet title="Editar colaborador" />

      <Grid2 size={12} mb={2}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
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
        <Grid2 size={{ xs: 12, md: 6 }}>
          {!isFetchingEmployee && (
            <TextField
              id="sector"
              name="sector"
              value={formik.values.sector ?? ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Setor *"
              fullWidth
              error={formik.touched.sector && Boolean(formik.errors.sector)}
              helperText={formik.touched.sector && formik.errors.sector}
            />
          )}
          {isFetchingEmployee && (
            <Skeleton variant="rounded" width="100%" height="54px" />
          )}
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          {!isFetchingEmployee && (
            <FormControl fullWidth>
              <InputLabel id="role">Permissão *</InputLabel>
              <Select
                labelId="role"
                id="role"
                name="role"
                value={formik.values.role ?? ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Permissão *"
                fullWidth
                error={formik.touched.role && Boolean(formik.errors.role)}
              >
                <MenuItem value={Role.EMPLOYEE}>Colaborador</MenuItem>
                <MenuItem value={Role.ADMIN}>Administrador</MenuItem>
              </Select>
            </FormControl>
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
