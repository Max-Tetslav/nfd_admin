import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import logo from '@assets/svg/logoIcon.svg';
import AsideMenuButton from '@components/common/asideMenuButton/AsideMenuButton';
import MenuList from '../menuList/MenuList';
import cl from './AsideMenu.module.scss';

const AsideMenu: React.FC = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const menuHandler = useCallback(() => {
    setIsMenuOpened((state) => !state);
  }, []);

  const classes = classNames(cl.container, { [cl.opened]: isMenuOpened });

  return (
    <>
      <aside className={classes}>
        <div className={cl.logoContainer}>
          <img className={cl.logo} src={logo} alt="logo" />
          <p className={cl.logoText}>Need For Drive</p>
        </div>
        <MenuList />
      </aside>
      <AsideMenuButton isActive={isMenuOpened} clickHandler={menuHandler} />
    </>
  );
};

export default AsideMenu;
