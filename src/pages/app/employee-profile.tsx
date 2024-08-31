import { Home, Settings } from '@mui/icons-material';
import { Box, Grid2, Skeleton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import type { Breadcrumb } from '../../shared/components/breadcrumbs';
import Breadcrumbs from '../../shared/components/breadcrumbs';
import { useEmployeeContext } from '../../shared/contexts/employee-context';
import recordTimesService from '../../shared/services/record-times-service';

const breadcrumbs: Breadcrumb[] = [
  {
    text: 'Página inicial',
    href: '/',
    icon: Home,
  },
  {
    text: 'Perfi',
    href: '/perfil',
    icon: Settings,
  },
];

export const EmployeeProfile = () => {
  const { isFetchingEmployee, employee } = useEmployeeContext();
  const [recordTimesToday, setRecordTimesToday] = useState<number>(0);

  useEffect(() => {
    if (employee) {
      recordTimesService
        .getRecordTimesToday()
        .then((x) => setRecordTimesToday(x));
    }
  }, [employee]);

  return (
    <Grid2 container size={12} spacing={2}>
      <Helmet title="Perfil" />

      <Grid2 size={12} mb={2}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </Grid2>
      <Grid2 container size={12} mt={2}>
        <Grid2 size={{ md: 6, xs: 12 }}>
          {!isFetchingEmployee && employee && (
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              gap={2}
            >
              <Typography
                sx={{ whiteSpace: 'nowrap' }}
                fontSize={16}
                fontWeight={500}
              >
                Nome:{' '}
              </Typography>
              <Typography fontSize={16}>{employee.name}</Typography>
            </Box>
          )}
          {isFetchingEmployee && (
            <Skeleton variant="rounded" width="100%" height="54px" />
          )}
        </Grid2>
        <Grid2 size={{ md: 6, xs: 12 }}>
          {!isFetchingEmployee && employee && (
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              gap={2}
            >
              <Typography
                sx={{ whiteSpace: 'nowrap' }}
                fontSize={16}
                fontWeight={500}
              >
                Pontos registrados hoje:{' '}
              </Typography>
              <Typography fontSize={16}>{recordTimesToday}</Typography>
            </Box>
          )}
          {isFetchingEmployee && (
            <Skeleton variant="rounded" width="100%" height="54px" />
          )}
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          {!isFetchingEmployee && employee && (
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              gap={2}
            >
              <Typography
                sx={{ whiteSpace: 'nowrap' }}
                fontSize={16}
                fontWeight={500}
              >
                Email:{' '}
              </Typography>
              <Typography fontSize={16}>{employee.email}</Typography>
            </Box>
          )}
          {isFetchingEmployee && (
            <Skeleton variant="rounded" width="100%" height="54px" />
          )}
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          {!isFetchingEmployee && employee && (
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              gap={2}
            >
              <Typography
                sx={{ whiteSpace: 'nowrap' }}
                fontSize={16}
                fontWeight={500}
              >
                Setor:{' '}
              </Typography>
              <Typography fontSize={16}>{employee.sector}</Typography>
            </Box>
          )}
          {isFetchingEmployee && (
            <Skeleton variant="rounded" width="100%" height="54px" />
          )}
        </Grid2>
      </Grid2>
    </Grid2>
  );
};
