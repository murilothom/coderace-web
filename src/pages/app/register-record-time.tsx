import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';

import { useAlertContext } from '../../shared/contexts/alert-context';
import { useEmployeeContext } from '../../shared/contexts/employee-context';
import recordTimesService from '../../shared/services/record-times-service';

export const RegisterRecordTime = () => {
  const [isRegisteringRecordTime, setIsRegisteringRecordTime] = useState(false);
  const { employee, isFetchingEmployee } = useEmployeeContext();
  const { showAlert } = useAlertContext();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [openModal, setOpenModal] = useState(false); // Estado para controlar o modal

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirm = async () => {
    try {
      setIsRegisteringRecordTime(true);
      await recordTimesService.registerRecordTime();
      showAlert('Registro de ponto efetuado com sucesso!');
      setOpenModal(false);
    } catch (error) {
      if (isAxiosError(error)) {
        showAlert(error?.response?.data?.message, 'error');
      }
    } finally {
      setIsRegisteringRecordTime(false);
    }
  };

  return (
    <>
      <Box sx={{ width: '100%', height: 'calc(100vh - 178px)' }}>
        {employee && !isFetchingEmployee ? (
          <>
            <Box
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <Typography variant="h4">
                {currentTime.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </Typography>
            </Box>

            <Box
              sx={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                marginTop: '-100px',
              }}
            >
              <Button
                sx={{ minWidth: '200px' }}
                variant="contained"
                onClick={handleOpenModal}
                disabled={isRegisteringRecordTime}
              >
                Registrar ponto
              </Button>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Confirmação</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza de que deseja registrar o ponto?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            color="primary"
            variant="contained"
            disabled={isRegisteringRecordTime}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
