import { Add, Edit, Home, Person, RemoveRedEye } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid2,
} from '@mui/material';
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';
import { isAxiosError } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import type { Breadcrumb } from '../../shared/components/breadcrumbs';
import Breadcrumbs from '../../shared/components/breadcrumbs';
import { useAlertContext } from '../../shared/contexts/alert-context';
import aiService from '../../shared/services/ai-service';
import enterprisesService from '../../shared/services/enterprise-service';
import { dataGridComponentTranslation } from '../../shared/utils/data-grid-component-translation';
import { response } from './temp';

const breadcrumbs: Breadcrumb[] = [
  {
    text: 'Página inicial',
    href: '/',
    icon: Home,
  },
  {
    text: 'Feedbacks',
    href: '/feedbacks',
    icon: Person,
  },
];

export const ListFeedbacks = () => {
  const [sectors, setSectors] = useState<{ id: number; sector: string }[]>([]);
  const { showAlert } = useAlertContext();
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<string>('');

  const handleOpen = useCallback(async (sector: string) => {
    setIsLoading(true);
    try {
      const response = await enterprisesService.getSectorInsight(sector);
      const insight = Object.values(response[0].responses);
      setSelectedFeedback(insight[0]);
      setOpen(true);
    } catch (error) {
      if (isAxiosError(error)) {
        showAlert(error?.response?.data?.message, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleClose = () => {
    setSelectedFeedback('');
    setOpen(false);
  };

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'sector',
        headerName: 'Setor',
        flex: 0.85,
        resizable: false,
        sortable: true,
      },
      {
        field: '#',
        headerName: 'Visualizar',
        flex: 0.15,
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
              <Button
                onClick={() => handleOpen(row.sector)}
                disabled={isLoading}
              >
                <RemoveRedEye fontSize="small" sx={{ lineHeight: 0 }} />
              </Button>
            </Box>
          );
        },
      },
    ],
    [isLoading],
  );

  const getAiFeedbacks = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await enterprisesService.getEnterpriseSectors();
      const sectors = response.map((sector, index) => ({
        sector: sector.sector,
        id: index,
      }));
      setSectors(sectors);
    } catch (error) {
      if (isAxiosError(error)) {
        showAlert(error?.response?.data?.message, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getAiFeedbacks();
  }, [getAiFeedbacks]);

  return (
    <>
      <Grid2 container size={12} spacing={2}>
        <Helmet title="Colaboradores" />

        <Grid2 size={12} mb={2}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </Grid2>
        <Grid2 container size={12} mt={2}>
          <DataGridPro
            localeText={dataGridComponentTranslation}
            columns={columns}
            rows={sectors}
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

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Detalhes do Feedback</DialogTitle>
        <DialogContent>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {selectedFeedback}
          </ReactMarkdown>
        </DialogContent>
      </Dialog>
    </>
  );
};
