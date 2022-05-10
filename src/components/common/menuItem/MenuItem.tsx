import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import cl from './MenuItem.module.scss';

interface IMenuItemProps {
  text: string;
  img: string;
  page: string;
}

const MenuItem: React.FC<IMenuItemProps> = ({ text, img, page }) => {
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
