import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import nfdApi from '@services/api';
import { IOrderData, TPostOrderData } from '@models/data';
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
  const navigate = useNavigate();
  const stateFilters = useAppSelector((state) => state.filters.order);
  const [page, setPage] = useState(1);

  const [putOrder] = nfdApi.usePutOrderMutation();
  const rateRequest = nfdApi.useGetRateListQuery({ page: 0 });
  const cityRequest = nfdApi.useGetCityListQuery({ page: 0 });
  const statusRequest = nfdApi.useGetStatusListQuery({
    page: 0,
  });
  const {
    refetch,
    data: orderRequest,
    error,
    isFetching,
    isLoading,
  } = nfdApi.useGetOrdersListQuery({
    page: page - 1,
    city: stateFilters.finalList.city,
    rate: stateFilters.finalList.rate,
    status: stateFilters.finalList.status,
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
    refetch();
  }, [page]);

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
    if ((error as { originalStatus: number })?.originalStatus === 401) {
      refetch();
    }
  }, [error]);

  const actionHandler = useCallback(
    (orderId: string, orderData: TPostOrderData) => {
      return putOrder({
        id: orderId,
        data: orderData,
      });
    },
    [],
  );

  const editHandler = useCallback((orderId: string) => {
    navigate(`:${orderId}`);
  }, []);

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

    let list: ReactNode;

    if (orderRequest?.data[0].id === orders[0]?.id) {
      list = (
        <OrdersList
          orders={orders}
          actionHandler={actionHandler}
          editHandler={editHandler}
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
            {list}
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
