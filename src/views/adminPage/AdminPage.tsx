import React from 'react';
import AsideMenu from '@components/containers/asideMenu/AsideMenu';
import AdminContent from '@components/containers/adminContent/AdminContent';
import cl from './AdminPage.module.scss';

const AdminPage: React.FC = () => {
  return (
    <main className={cl.container}>
      <AsideMenu />
      <AdminContent />
    </main>
  );
};

export default AdminPage;
