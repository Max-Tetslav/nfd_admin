import React, { FC, useEffect, useMemo, useState } from 'react';
import nfdApi from '@services/api';
import { IPoint } from '@models/data';
import AdminPagination from '@components/common/adminPagination/AdminPagination';
import Spin from '@components/common/spin/Spin';
import AdminTable from '@components/common/adminTable/AdminTable';
import AdminError from '@components/common/adminError/AdminError';
import { POINT_HEADERS } from '@utils/constants/tables';
import cl from './TablePoints.module.scss';

const TablePoints: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const [page, setPage] = useState(1);
  const { data: pointRequest, error } = nfdApi.useGetPointListQuery({
    page: page - 1,
  });

  const [points, setPoints] = useState<IPoint[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (pointRequest?.data) {
      timer = setTimeout(() => {
        setIsLoading(false);
        setIsPageLoading(false);
      }, 2000);
      setPoints(pointRequest.data);
      setTotal(pointRequest.count);
    } else if (error) {
      setIsLoading(false);
      setIsPageLoading(false);
    }

    return () => clearTimeout(timer);
  }, [pointRequest]);

  useEffect(() => {
    setIsPageLoading(true);

    let timer: NodeJS.Timeout;

    if (pointRequest?.data) {
      timer = setTimeout(() => {
        setIsPageLoading(false);
      }, 2000);

      setPoints(pointRequest.data);
    }

    return () => clearTimeout(timer);
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

    return isPageLoading ? (
      <Spin loading={isPageLoading} />
    ) : (
      <>
        <AdminTable data={points} headers={POINT_HEADERS} type="point" />
        {pagination}
      </>
    );
  }, [isPageLoading, total, error]);

  return (
    <main className={cl.container}>
      {isLoading ? <Spin loading={isLoading} /> : content}
    </main>
  );
};

export default TablePoints;
