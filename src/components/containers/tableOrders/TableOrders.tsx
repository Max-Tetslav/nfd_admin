import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getOrders } from '@services/api';
import { IOrderData } from '@models/data';
import AdminPagination from '@components/common/adminPagination/AdminPagination';
import FilterList from '@components/common/filterList/FilterList';
import OrdersList from '../ordersList/OrdersList';
import cl from './TableOrders.module.scss';

const TableOrders: React.FC = () => {
  const request = getOrders();
  const [orders, setOrders] = useState<IOrderData[]>([]);

  useEffect(() => {
    request.then((data) => {
      if (data.data) {
        const filteredData = (data.data.data as IOrderData[]).filter(
          (item) => item.carId && item.pointId && item.price,
        );

        setOrders(filteredData);
      }
    });
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    request.then(() => {
      timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    });

    return () => clearTimeout(timer);
  }, []);

  const spinClasses = classNames(cl.spin, { [cl.closed]: !isLoading });

  return (
    <main className={cl.container}>
      {isLoading ? (
        <div className={spinClasses} />
      ) : (
        <>
          <FilterList />
          <OrdersList orders={orders} />
          <AdminPagination />
        </>
      )}
    </main>
  );
};

export default TableOrders;
