import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cl from './AdminFooter.module.scss';

const AdminFooter: React.FC = () => {
  const location = useLocation();

  return (
    <footer className={cl.container}>
      <ul className={cl.list}>
        <li className={cl.listItem}>
          <Link className={cl.link} to={location.pathname}>
            Главная страница
          </Link>
        </li>
        <li className={cl.listItem}>
          <Link className={cl.link} to={location.pathname}>
            Ссылка
          </Link>
        </li>
      </ul>
      <p className={cl.copy}>Copyright © 2020 Simbirsoft</p>
    </footer>
  );
};

export default AdminFooter;
