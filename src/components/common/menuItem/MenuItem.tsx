import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { IMenuItem } from '@models/data';
import cl from './MenuItem.module.scss';

interface IMenuItemProps {
  data: IMenuItem;
}

const MenuItem: React.FC<IMenuItemProps> = ({ data: { text, img, page } }) => {
  const location = useLocation();

  const classes = classNames(cl.container, {
    [cl.active]: location.pathname.includes(page),
  });

  return (
    <li className={classes}>
      <img className={cl.img} src={img} alt="" />
      <Link className={cl.text} to={location.pathname}>
        {text}
      </Link>
    </li>
  );
};

export default MenuItem;
