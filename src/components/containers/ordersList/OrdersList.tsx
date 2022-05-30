import React from 'react';
import { IOrderData, TPostOrderData } from '@models/data';
import OrderCard from '@components/common/orderCard/OrderCard';
import NoData from '@components/common/noData/NoData';
import cl from './OrdersList.module.scss';

interface IOrderListProps {
  orders: IOrderData[];
  actionHandler: (id: string, orderData: TPostOrderData) => Promise<unknown>;
  editHandler: (id: string) => void;
}

const OrdersList: React.FC<IOrderListProps> = ({
  orders,
  actionHandler,
  editHandler,
}) => {
  return (
    <div className={cl.container}>
      {orders.length > 0 ? (
        orders.map((item) => (
          <OrderCard
            order={item}
            actionHandler={actionHandler}
            editHandler={editHandler}
            key={item.id}
          />
        ))
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default OrdersList;
