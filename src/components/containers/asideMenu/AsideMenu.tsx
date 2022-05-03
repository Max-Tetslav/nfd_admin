import React from 'react';
import logo from '@assets/svg/logo.svg';
import MenuList from '../menuList/MenuList';
import cl from './AsideMenu.module.scss';

const AsideMenu: React.FC = () => {
  return (
    <aside className={cl.container}>
      <div className={cl.logoContainer}>
        <img className={cl.logo} src={logo} alt="logo" />
      </div>
      <MenuList />
    </aside>
  );
};

export default AsideMenu;
