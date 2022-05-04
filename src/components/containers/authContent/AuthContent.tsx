import React from 'react';
import logo from '@assets/svg/logo.svg';
import AuthForm from '../authForm/AuthForm';
import cl from './AuthContent.module.scss';

const AuthContent: React.FC = () => {
  return (
    <div className={cl.container}>
      <img className={cl.logo} src={logo} alt="logo" />
      <AuthForm />
    </div>
  );
};

export default AuthContent;
