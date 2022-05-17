import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from 'antd';
import useAnimate from '@hooks/useAnimate';
import cl from './AdminError.module.scss';

interface IAdminErrorProps {
  code: number;
}

const AdminError: React.FC<IAdminErrorProps> = ({ code }) => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useAnimate(setAnimate);

  const clickHandler = useCallback(() => {
    navigate(-1);
  }, []);

  const classes = classNames(cl.container, { [cl.loaded]: animate });

  return (
    <div className={classes}>
      <div className={cl.textContainer}>
        <h2 className={cl.code}>{code}</h2>
        <p className={cl.errorText}>Что-то пошло не так</p>
        <p className={cl.tryAgainText}>Попробуйте перезагрузить страницу</p>
      </div>
      <Button className={cl.button} onClick={clickHandler}>
        Назад
      </Button>
    </div>
  );
};

export default AdminError;
