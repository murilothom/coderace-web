import React from 'react';
import { Navigate } from 'react-router-dom';

// import { useUserContext } from '../shared/contexts/user-context';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  // const { user, isFetchingUser } = useUserContext();

  // if (isFetchingUser) {
  //   return null;
  // }

  // if (user) {
  //   return <Navigate to="/" replace />;
  // }

  return <>{children}</>;
};