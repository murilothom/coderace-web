import React from 'react';
import { Navigate } from 'react-router-dom';

import { useEmployeeContext } from '../shared/contexts/employee-context';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { employee, isFetchingEmployee } = useEmployeeContext();

  if (isFetchingEmployee) {
    return null;
  }

  if (employee) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
