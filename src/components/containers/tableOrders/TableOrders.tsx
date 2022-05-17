import React, { useEffect, useMemo, useState } from 'react';
import nfdApi from '@services/api';
import { INameAndID, IOrderData } from '@models/data';
import { ETableTypes } from '@models/app';
import { useAppSelector } from '@store/store';
import AdminPagination from '@components/common/adminPagination/AdminPagination';
import FilterList from '@components/common/filterList/FilterList';
import Spin from '@components/common/spin/Spin';
import AdminError from '@components/common/adminError/AdminError';
import { DATA_ERROR_MESSAGE } from '@utils/constants/tables';
import OrdersList from '../ordersList/OrdersList';
import cl from './TableOrders.module.scss';

const TableOrders: React.FC = () => {
  const stateFilters = useAppSelector((state) => state.filters.order);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const [page, setPage] = useState(1);
  const {
    refetch,
    data: orderRequest,
    error,
  } = nfdApi.useGetOrdersListQuery({
    page: page - 1,
    city: stateFilters.finalList.city,
    rate: stateFilters.finalList.rate,
    status: stateFilters.finalList.status,
  });

  const rateRequest = nfdApi.useGetRateListQuery({ page: page - 1, limit: 20 });
  const cityRequest = nfdApi.useGetCityListQuery({ page: page - 1, limit: 20 });
  const statusRequest = nfdApi.useGetStatusListQuery({
    page: page - 1,
    limit: 20,
  });

  const [orders, setOrders] = useState<IOrderData[]>([]);
  const [rates, setRates] = useState<INameAndID[]>([]);
  const [cityList, setCityList] = useState<INameAndID[]>([]);
  const [statusList, setStatusList] = useState<INameAndID[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (stateFilters.filterStatus === true) {
      refetch();
    }

    setPage(1);
  }, [stateFilters.filterStatus]);

  useEffect(() => {
    if (rateRequest.data) {
      const filteredRate = rateRequest.data.data.map((item) => ({
        name: item.rateTypeId?.name || DATA_ERROR_MESSAGE,
        id: item.rateTypeId?.id || DATA_ERROR_MESSAGE,
      }));

      setRates(filteredRate);
    }

    if (cityRequest.data) {
      const filteredRate = cityRequest.data.data.map((item) => ({
        name: item.name,
        id: item.id,
      }));

      setCityList(filteredRate);
    }

    if (statusRequest.data) {
      const filteredRate = statusRequest.data.data.map((item) => ({
        name: item.name,
        id: item.id,
      }));

      setStatusList(filteredRate);
    }
  }, [rateRequest, statusRequest, cityRequest]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (orderRequest?.data) {
      timer = setTimeout(() => {
        setIsLoading(false);
        setIsPageLoading(false);
      }, 2000);

      setOrders(orderRequest.data);
      setTotal(orderRequest.count);
    } else if (error) {
      setIsLoading(false);
      setIsPageLoading(false);
    }

    return () => clearTimeout(timer);
  }, [orderRequest, error]);

  // Переключении страниц/фильтров

  useEffect(() => {
    setIsPageLoading(true);

    let timer: NodeJS.Timeout;

    if (orderRequest?.data) {
      timer = setTimeout(() => {
        setIsPageLoading(false);
      }, 2000);

      setOrders(orderRequest.data);
    }

    return () => clearTimeout(timer);
  }, [page, stateFilters.finalList]);

  const pagination = useMemo(() => {
    return total > 5 ? (
      <AdminPagination
        setPage={setPage}
        pageProp={page}
        total={total}
        limit={5}
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

    return (
      <>
        <FilterList
          type={ETableTypes.ORDER}
          rateList={rates}
          cityList={cityList}
          statusList={statusList}
        />
        {isPageLoading ? (
          <Spin loading={isPageLoading} />
        ) : (
          <>
            <OrdersList orders={orders} />
            {pagination}
          </>
        )}
      </>
    );
  }, [isPageLoading, total, error]);

  return (
    <main className={cl.container}>
      {isLoading ? <Spin loading={isLoading} /> : content}
    </main>
  );
};

export default TableOrders;
