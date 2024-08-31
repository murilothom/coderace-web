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
import { useEffect, useState } from 'react';

import { useEmployeeContext } from '../../shared/contexts/employee-context';

interface RegisterRecordTimeProps {
  isLoading: boolean;
  handleConfirm: () => Promise<void>;
  openModal: () => void;
  closeModal: () => void;
  isModalOpen: boolean;
}

export const RegisterRecordTime = ({
  handleConfirm,
  isLoading,
  closeModal,
  openModal,
  isModalOpen,
}: RegisterRecordTimeProps) => {
  const { employee, isFetchingEmployee } = useEmployeeContext();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
                onClick={openModal}
                disabled={isLoading}
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

      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>Confirmação</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza de que deseja registrar o ponto?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            color="primary"
            variant="contained"
            disabled={isLoading}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
