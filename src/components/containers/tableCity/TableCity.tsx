import React, { FC, useEffect, useMemo, useState } from 'react';
import nfdApi from '@services/api';
import { INameAndID } from '@models/data';
import AdminPagination from '@components/common/adminPagination/AdminPagination';
import Spin from '@components/common/spin/Spin';
import AdminTable from '@components/common/adminTable/AdminTable';
import AdminError from '@components/common/adminError/AdminError';
import { NAME_AND_ID_HEADERS } from '@utils/constants/tables';
import cl from './TableCity.module.scss';

const TableCity: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const [page, setPage] = useState(1);
  const { data: cityRequest, error } = nfdApi.useGetCityListQuery({
    page: page - 1,
    limit: 6,
  });

  const [cities, setCities] = useState<INameAndID[]>([]);
  const [totalCity, setTotal] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (cityRequest?.data) {
      timer = setTimeout(() => {
        setIsLoading(false);
        setIsPageLoading(false);
      }, 2000);

      setCities(cityRequest.data);
      setTotal(cityRequest.count);
    }

    return () => clearTimeout(timer);
  }, [cityRequest]);

  // Переключении страниц

  useEffect(() => {
    setIsPageLoading(true);

    let timer: NodeJS.Timeout;

    if (cityRequest?.data) {
      timer = setTimeout(() => {
        setIsPageLoading(false);
      }, 2000);

      setCities(cityRequest.data);
    }

    return () => clearTimeout(timer);
  }, [page]);

  const pagination = useMemo(() => {
    return totalCity > 6 ? (
      <AdminPagination
        setPage={setPage}
        pageProp={page}
        total={totalCity}
        limit={6}
      />
    ) : null;
  }, [totalCity, page]);

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
        <AdminTable data={cities} headers={NAME_AND_ID_HEADERS} type="city" />
        {pagination}
      </>
    );
  }, [isPageLoading, totalCity, error]);

  return (
    <main className={cl.container}>
      {isLoading ? <Spin loading={isLoading} /> : content}
    </main>
  );
};

export default TableCity;
