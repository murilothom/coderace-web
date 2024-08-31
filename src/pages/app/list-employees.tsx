import { Add, Edit, Home, Person, Settings } from '@mui/icons-material';
import { Box, Grid2, Link } from '@mui/material';
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';
import { isAxiosError } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import type { Breadcrumb } from '../../shared/components/breadcrumbs';
import Breadcrumbs from '../../shared/components/breadcrumbs';
import { useAlertContext } from '../../shared/contexts/alert-context';
import { useEmployeeContext } from '../../shared/contexts/employee-context';
import employeeService from '../../shared/services/employee-service';
import { Employee } from '../../shared/types/Employee';
import { dataGridComponentTranslation } from '../../shared/utils/data-grid-component-translation';

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
];

export const ListEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const { showAlert } = useAlertContext();
  const [isLoading, setIsLoading] = useState(true);

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: '#',
        headerName: 'Editar',
        flex: 0.1,
        resizable: false,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: ({ row }) => {
          return (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Link
                component={RouterLink}
                to={`/colaboradores/${row.id}`}
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  mt: 0.5,
                }}
              >
                <Edit fontSize="small" sx={{ lineHeight: 0 }} />
              </Link>
            </Box>
          );
        },
      },
      {
        field: 'name',
        headerName: 'Nome',
        flex: 0.3,
        resizable: false,
        sortable: true,
      },
      {
        field: 'email',
        headerName: 'E-mail',
        flex: 0.3,
        resizable: false,
        sortable: true,
      },
      {
        field: 'sector',
        headerName: 'Setor',
        flex: 0.3,
        resizable: false,
        sortable: true,
      },
    ],
    [],
  );

  const getEmployees = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await employeeService.getAll();
      setEmployees(response);
    } catch (error) {
      if (isAxiosError(error)) {
        showAlert(error?.response?.data?.message, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  return (
    <Grid2 container size={12} spacing={2}>
      <Helmet title="Colaboradores" />

      <Grid2 size={12} mb={2}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </Grid2>
      <Grid2 size={12}>
        <Link
          underline="hover"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            textDecoration: 'underline',
          }}
          color="text.primary"
          to="/colaboradores/novo"
          component={RouterLink}
        >
          <Add fontSize="small" /> Novo colaborador
        </Link>
      </Grid2>
      <Grid2 container size={12} mt={2}>
        <DataGridPro
          localeText={dataGridComponentTranslation}
          columns={columns}
          rows={employees}
          getRowId={(row) => row.id}
          loading={isLoading}
          disableColumnFilter
          autoHeight
          disableColumnMenu
          disableColumnSelector
          hideFooter
        />
      </Grid2>
    </Grid2>
  );
};
