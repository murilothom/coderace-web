import { Check, Error, Info, Warning } from '@mui/icons-material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { createContext, ReactNode, useContext, useState } from 'react';

interface AlertContextType {
  showAlert: (message: string, severity?: AlertProps['severity']) => void;
}

interface AlertProviderProps {
  children: ReactNode;
}

const AlertContext = createContext<AlertContextType>({} as AlertContextType);

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertProps['severity']>('info');

  const showAlert = (
    newMessage: string,
    newSeverity: AlertProps['severity'] = 'info',
  ) => {
    setMessage(newMessage || 'Erro ao executar a requisição');
    setSeverity(newSeverity);
    setOpen(true);
  };

  const hideAlert = () => {
    setOpen(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={hideAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert
          icon={
            <>
              {severity === 'error' && <Error fontSize="inherit" />}
              {severity === 'info' && <Info fontSize="inherit" />}
              {severity === 'warning' && <Warning fontSize="inherit" />}
              {severity === 'success' && <Check fontSize="inherit" />}
            </>
          }
          onClose={hideAlert}
          severity={severity}
          sx={{ width: '100%' }}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export const useAlertContext = (): AlertContextType => {
  const context = useContext(AlertContext);
  return context;
};