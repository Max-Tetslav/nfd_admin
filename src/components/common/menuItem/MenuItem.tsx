import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { IMenuItem } from '@models/app';
import MenuSubItem from '../menuSubItem/MenuSubItem';
import cl from './MenuItem.module.scss';

interface IMenuItemProps {
  data: IMenuItem;
  isAddMode: boolean;
}

const MenuItem: React.FC<IMenuItemProps> = ({
  data: { text, img, page, sub },
  isAddMode,
}) => {
  const location = useLocation();

  const classes = classNames(cl.container, {
    [cl.active]: location.pathname.includes(page),
  });

  const textClasses = classNames(cl.text, { [cl.addMode]: sub && isAddMode });

  return (
    <li className={classes}>
      <Link className={cl.link} to={isAddMode && sub ? sub.page : page}>
        <img className={cl.img} src={img} alt="" />
        <span className={textClasses}>{text}</span>
        {sub ? <MenuSubItem text={sub.text} isActive={isAddMode} /> : null}
      </Link>
    </li>
  );
};

export default MenuItem;
