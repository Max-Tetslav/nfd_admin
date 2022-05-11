import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { IOrderData } from '@models/data';
import OrderCard from '@components/common/orderCard/OrderCard';
import cl from './OrdersList.module.scss';

interface IOrderListProps {
  orders: IOrderData[];
}

const OrdersList: React.FC<IOrderListProps> = ({ orders }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const classes = classNames(cl.container, { [cl.loaded]: animate });

  return (
    <div className={classes}>
      {orders.length > 0
        ? orders.map((item) => <OrderCard order={item} key={item.id} />)
        : null}
    </div>
  );
};

export default OrdersList;
