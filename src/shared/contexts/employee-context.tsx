import { isAxiosError } from 'axios';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import authService from '../services/auth-service';
import employeesService from '../services/employee-service';
import { Employee } from '../types/Employee';

interface EmployeeContextType {
  employee: Employee | null;
  isFetchingEmployee: boolean;
  fetchEmployee: () => Promise<void>;
  logout: () => void;
}

export const EmployeeContext = createContext({} as EmployeeContextType);

interface EmployeeProviderProps {
  children: ReactNode;
}

export function EmployeeProvider({ children }: EmployeeProviderProps) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isFetchingEmployee, setIsFetchingEmployee] = useState<boolean>(true);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    authService.logout();
    setEmployee(null);
    navigate('/entrar', { replace: true });
  }, []);

  const fetchEmployee = useCallback(async () => {
    try {
      setIsFetchingEmployee(true);
      const response = await employeesService.getCurrentEmployee();
      setEmployee(response);
    } catch (error) {
      if (isAxiosError(error)) {
        logout();
      }
    } finally {
      setIsFetchingEmployee(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  return (
    <EmployeeContext.Provider
      value={{ employee, fetchEmployee, isFetchingEmployee, logout }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  return context;
};
