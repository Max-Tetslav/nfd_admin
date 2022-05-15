import React from 'react';
import { Input } from 'antd';
import searchIcon from '@assets/svg/search.svg';
import UserBox from '@components/common/userBox/UserBox';
import cl from './AdminHeader.module.scss';

const AdminHeader: React.FC = () => {
  return (
    <header className={cl.container}>
      <Input
        className={cl.input}
        prefix={<img src={searchIcon} alt="search" />}
        placeholder="Поиск ..."
      />
      <UserBox />
    </header>
  );
};

export default AdminHeader;
