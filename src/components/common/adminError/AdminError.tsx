import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import cl from './AdminError.module.scss';

interface IAdminErrorProps {
  code: number;
}

const AdminError: React.FC<IAdminErrorProps> = ({ code }) => {
  const navigate = useNavigate();

  const clickHandler = useCallback(() => {
    navigate(-1);
  }, []);

  const text = useMemo(() => {
    switch (code) {
      case 404:
        return 'Страница не найдена';
      default:
        return 'Попробуйте перезагрузить страницу';
    }
  }, [code]);

  return (
    <div className={cl.container}>
      <div className={cl.textContainer}>
        <h2 className={cl.code}>{code}</h2>
        <p className={cl.errorText}>Что-то пошло не так</p>
        <p className={cl.tryAgainText}>{text}</p>
      </div>
      <Button className={cl.button} onClick={clickHandler}>
        Назад
      </Button>
    </div>
  );
};

export default AdminError;
