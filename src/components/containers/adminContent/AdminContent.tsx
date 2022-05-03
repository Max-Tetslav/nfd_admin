import React from 'react';
import AdminHeader from '../adminHeader/AdminHeader';
import AdminData from '../adminData/AdminData';
import AdminFooter from '../adminFooter/AdminFooter';
import cl from './AdminContent.module.scss';

const AdminContent: React.FC = () => {
  return (
    <main className={cl.container}>
      <AdminHeader />
      <AdminData />
      <AdminFooter />
    </main>
  );
};

export default AdminContent;
