import React from 'react';
import AuthContent from '@components/containers/authContent/AuthContent';
import cl from './AuthPage.module.scss';

const AuthPage: React.FC = () => {
  return (
    <main className={cl.container}>
      <AuthContent />
    </main>
  );
};

export default AuthPage;
