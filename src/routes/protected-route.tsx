import React from 'react';
import { Navigate } from 'react-router-dom';

import { useEmployeeContext } from '../shared/contexts/employee-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  shouldBeAuthenticated: boolean;
}

export const ProtectedRoute = ({
  children,
  shouldBeAuthenticated,
}: ProtectedRouteProps) => {
  const { employee, isFetchingEmployee } = useEmployeeContext();

  if (isFetchingEmployee) return null;

  if (!shouldBeAuthenticated && employee) {
    return <Navigate to="/" replace />;
  }

  if (shouldBeAuthenticated && !employee) {
    return <Navigate to="/entrar" replace />;
  }

  return <>{children}</>;
};
