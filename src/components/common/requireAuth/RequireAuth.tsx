import React, { ReactElement } from 'react';
import { useAppSelector } from '@store/store';
import { Navigate } from 'react-router-dom';

interface IRequireAuth {
  children: ReactElement;
}

const RequireAuth: React.FC<IRequireAuth> = ({ children }) => {
  const isAuth = useAppSelector((state) => state.auth.status);

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireAuth;
