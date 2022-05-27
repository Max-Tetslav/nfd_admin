import React, { FC } from 'react';
import classNames from 'classnames';
import cl from './MenuSubItem.module.scss';

interface IMenuSubItemProps {
  text: string;
  isActive: boolean;
}

const MenuSubItem: FC<IMenuSubItemProps> = ({ text, isActive }) => {
  const classes = classNames(cl.container, { [cl.active]: isActive });

  return <span className={classes}>{text}</span>;
};

export default MenuSubItem;
