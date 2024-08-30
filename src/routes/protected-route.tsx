import React from 'react';
import { Navigate } from 'react-router-dom';

// import { useUserContext } from '../shared/contexts/user-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  shouldBeAuthenticated: boolean;
}

export const ProtectedRoute = ({
  children,
  shouldBeAuthenticated,
}: ProtectedRouteProps) => {
  // const { user, isFetchingUser } = useUserContext();

  // if (isFetchingUser) return null;

  // if (!shouldBeAuthenticated && user) {
  //   return <Navigate to="/" replace />;
  // }

  // if (shouldBeAuthenticated && !user) {
  //   return <Navigate to="/entrar" replace />;
  // }

  return <>{children}</>;
};