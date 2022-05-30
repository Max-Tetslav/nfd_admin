import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface IRequireAuth {
  children: ReactElement;
}

const RequireAuth: React.FC<IRequireAuth> = ({ children }) => {
  const isAuth =
    localStorage.getItem('accessToken') || localStorage.getItem('refreshToken');

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireAuth;
