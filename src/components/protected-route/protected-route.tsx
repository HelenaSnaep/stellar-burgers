import React, { FC } from 'react';

interface IProtectedRouteProps {
  children: React.ReactNode;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }) => (
  <>{children}</>
);
