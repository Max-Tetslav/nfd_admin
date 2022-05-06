import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cl from './MenuItem.module.scss';

interface IMenuItemProps {
  text: string;
  img: string;
}

const MenuItem: React.FC<IMenuItemProps> = ({ text, img }) => {
  const location = useLocation();

  return (
    <li className={cl.container}>
      <img className={cl.img} src={img} alt="" />
      <Link className={cl.text} to={location.pathname}>
        {text}
      </Link>
    </li>
  );
};

export default MenuItem;
