import React from 'react';
import nfdApi from '@services/api';
import AdminError from '../adminError/AdminError';
import cl from './AdminData.module.scss';

const AdminData: React.FC = () => {
  const { error } = nfdApi.useGetOrderStatusQuery('');

  return (
    <div className={cl.container}>
      {error ? (
        <AdminError
          code={(error as { originalStatus: number }).originalStatus}
        />
      ) : null}
    </div>
  );
};

export default AdminData;
