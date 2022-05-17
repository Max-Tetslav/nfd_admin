import React, { useEffect, useMemo, useState } from 'react';
import nfdApi from '@services/api';
import { IOrderData } from '@models/data';
import { ETableTypes } from '@models/app';
import { useAppDispatch, useAppSelector } from '@store/store';
import { updataOrderAllFilters } from '@store/reducers/filters';
import AdminPagination from '@components/common/adminPagination/AdminPagination';
import FilterList from '@components/common/filterList/FilterList';
import Spin from '@components/common/spin/Spin';
import AdminError from '@components/common/adminError/AdminError';
import { DATA_ERROR_MESSAGE } from '@utils/constants/tables';
import OrdersList from '../ordersList/OrdersList';
import cl from './TableOrders.module.scss';

const TableOrders: React.FC = () => {
  const dispatch = useAppDispatch();
  const stateFilters = useAppSelector((state) => state.filters.order);

  const [page, setPage] = useState(1);
  const {
    refetch,
    data: orderRequest,
    error,
    isLoading,
    isFetching,
  } = nfdApi.useGetOrdersListQuery({
    page: page - 1,
    city: stateFilters.finalList.city,
    rate: stateFilters.finalList.rate,
    status: stateFilters.finalList.status,
  });

  const rateRequest = nfdApi.useGetRateListQuery({ page: 0, limit: 20 });
  const cityRequest = nfdApi.useGetCityListQuery({ page: 0, limit: 20 });
  const statusRequest = nfdApi.useGetStatusListQuery({
    page: 0,
    limit: 20,
  });

  const [orders, setOrders] = useState<IOrderData[]>([]);
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

      dispatch(updataOrderAllFilters({ rate: filteredRate }));
    }

    if (cityRequest.data) {
      const filteredRate = cityRequest.data.data.map((item) => ({
        name: item.name,
        id: item.id,
      }));

      dispatch(updataOrderAllFilters({ city: filteredRate }));
    }

    if (statusRequest.data) {
      const filteredRate = statusRequest.data.data.map((item) => ({
        name: item.name,
        id: item.id,
      }));

      dispatch(updataOrderAllFilters({ status: filteredRate }));
    }
  }, [rateRequest, statusRequest, cityRequest]);

  useEffect(() => {
    if (orderRequest?.data) {
      setOrders(orderRequest.data);
      setTotal(orderRequest.count);
    }
  }, [orderRequest]);

  useEffect(() => {
    if (orderRequest?.data) {
      setOrders(orderRequest.data);
    }
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
          rateList={stateFilters.all.rate}
          cityList={stateFilters.all.city}
          statusList={stateFilters.all.status}
        />
        {isFetching ? (
          <Spin loading={isFetching} />
        ) : (
          <>
            <OrdersList orders={orders} />
            {pagination}
          </>
        )}
      </>
    );
  }, [isFetching, orders, error]);

  return (
    <main className={cl.container}>
      {isLoading ? <Spin loading={isLoading} /> : content}
    </main>
  );
};

export default TableOrders;
