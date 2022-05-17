import React, { FC, useEffect, useMemo, useState } from 'react';
import nfdApi from '@services/api';
import { IRate } from '@models/data';
import AdminPagination from '@components/common/adminPagination/AdminPagination';
import Spin from '@components/common/spin/Spin';
import AdminTable from '@components/common/adminTable/AdminTable';
import AdminError from '@components/common/adminError/AdminError';
import { RATE_HEADERS } from '@utils/constants/tables';
import cl from './TableRates.module.scss';

const TableRates: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const [page, setPage] = useState(1);
  const { data: rateRequest, error } = nfdApi.useGetRateListQuery({
    page: page - 1,
    limit: 6,
  });

  const [rates, setRates] = useState<IRate[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (rateRequest?.data) {
      timer = setTimeout(() => {
        setIsLoading(false);
        setIsPageLoading(false);
      }, 2000);

      setRates(rateRequest.data);
      setTotal(rateRequest.count);
    } else if (error) {
      setIsLoading(false);
      setIsPageLoading(false);
    }

    return () => clearTimeout(timer);
  }, [rateRequest]);

  useEffect(() => {
    setIsPageLoading(true);

    let timer: NodeJS.Timeout;

    if (rateRequest?.data) {
      timer = setTimeout(() => {
        setIsPageLoading(false);
      }, 2000);

      setRates(rateRequest.data);
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
        <AdminTable data={rates} headers={RATE_HEADERS} type="rate" />
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

export default TableRates;
