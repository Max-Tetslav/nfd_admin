import React from 'react';
import { Button } from 'antd';
import cl from './AdminError.module.scss';

interface IAdminErrorProps {
  code: number;
}

const AdminError: React.FC<IAdminErrorProps> = ({ code }) => {
  return (
    <div className={cl.container}>
      <div className={cl.textContainer}>
        <h2 className={cl.code}>{code}</h2>
        <p className={cl.errorText}>Что то пошло не так</p>
        <p className={cl.tryAgainText}>Попробуйте перезагрузить страницу</p>
      </div>
      <Button className={cl.button}>Назад</Button>
    </div>
  );
};

export default AdminError;
