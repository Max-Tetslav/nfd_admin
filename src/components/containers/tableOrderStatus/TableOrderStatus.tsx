import React, { FC, useEffect, useMemo, useState } from 'react';
import nfdApi from '@services/api';
import { INameAndID } from '@models/data';
import AdminPagination from '@components/common/adminPagination/AdminPagination';
import Spin from '@components/common/spin/Spin';
import AdminTable from '@components/common/adminTable/AdminTable';
import AdminError from '@components/common/adminError/AdminError';
import { NAME_AND_ID_HEADERS } from '@utils/constants/tables';
import cl from './TableOrderStatus.module.scss';

const TableOrderStatus: FC = () => {
  const [page, setPage] = useState(1);
  const {
    data: statusRequest,
    error,
    isFetching,
    isLoading,
  } = nfdApi.useGetStatusListQuery({
    page: page - 1,
  });

  const [statuses, setStatuses] = useState<INameAndID[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (statusRequest?.data) {
      setStatuses(statusRequest.data);
      setTotal(statusRequest.count);
    }
  }, [statusRequest]);

  useEffect(() => {
    if (statusRequest?.data) {
      setStatuses(statusRequest.data);
    }
  }, [page]);

  const pagination = useMemo(() => {
    return total > 6 ? (
      <AdminPagination
        setPage={setPage}
        pageProp={page}
        total={total}
        limit={6}
      />
    ) : null;
  }, [total, page]);

  const content = useMemo(() => {
    if (error) {
      return (
        <AdminError
          code={(error as { originalStatus: number }).originalStatus}
        />
      );
    }

    return isFetching ? (
      <Spin loading={isFetching} />
    ) : (
      <>
        <AdminTable data={statuses} headers={NAME_AND_ID_HEADERS} type="city" />
        {pagination}
      </>
    );
  }, [isFetching, statuses, error]);

  return (
    <main className={cl.container}>
      {isLoading ? <Spin loading={isLoading} /> : content}
    </main>
  );
};

export default TableOrderStatus;
