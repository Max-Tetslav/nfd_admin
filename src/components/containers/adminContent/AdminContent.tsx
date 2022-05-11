import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../adminHeader/AdminHeader';
import AdminFooter from '../adminFooter/AdminFooter';
import cl from './AdminContent.module.scss';

const AdminContent: React.FC = () => {
  return (
    <main className={cl.container}>
      <AdminHeader />
      <Outlet />
      <AdminFooter />
    </main>
  );
};

export default AdminContent;
