import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { IMenuItem } from '@models/app';
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
      <Link className={cl.link} to={page}>
        <img className={cl.img} src={img} alt="" />
        <span className={cl.text}>{text}</span>
      </Link>
    </li>
  );
};

export default MenuItem;
