import React, { useCallback, useState } from 'react';
import { Switch } from 'antd';
import MenuItem from '@components/common/menuItem/MenuItem';
import menuData from '@utils/constants/menuData';
import cl from './MenuList.module.scss';

const MenuList: React.FC = () => {
  const [addMode, setAddMode] = useState(false);

  const switchHandler = useCallback(() => {
    setAddMode((state) => !state);
  }, []);

  return (
    <>
      <ul className={cl.container}>
        {menuData.map((item) => {
          return <MenuItem data={item} key={item.id} isAddMode={addMode} />;
        })}
      </ul>
      <div className={cl.switchBox}>
        <span className={cl.text}>Добавить сущности:</span>
        <Switch onChange={switchHandler} />
      </div>
    </>
  );
};

export default MenuList;
