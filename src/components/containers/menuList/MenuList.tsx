import React from 'react';
import MenuItem from '@components/common/menuItem/MenuItem';
import menuData from '@utils/constants/menuData';
import cl from './MenuList.module.scss';

const MenuList: React.FC = () => {
  return (
    <ul className={cl.container}>
      {menuData.map((item) => {
        return <MenuItem data={item} key={item.id} />;
      })}
    </ul>
  );
};

export default MenuList;
