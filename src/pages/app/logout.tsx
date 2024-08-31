import { useEmployeeContext } from '../../shared/contexts/employee-context';

export const Logout = () => {
  const { logout, employee } = useEmployeeContext();

  if (employee) {
    logout();
  }

  return null;
};
