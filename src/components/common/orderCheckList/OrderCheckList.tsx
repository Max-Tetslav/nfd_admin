import React from 'react';
import getOrderOptions from '@utils/helpers/getOrderOptionsData';
import Checkbox from '../checkbox/Checkbox';
import cl from './OrderCheckList.module.scss';

interface IOrderCheckListProps {
  tank: boolean;
  chair: boolean;
  wheel: boolean;
}

const OrderCheckList: React.FC<IOrderCheckListProps> = ({
  tank,
  chair,
  wheel,
}) => {
  return (
    <div className={cl.container}>
      {getOrderOptions(tank, chair, wheel).map((item) => (
        <Checkbox
          title={item.name}
          id={`${item.type}${item.id}`}
          key={item.id}
          status={item.status}
          readOnly
        />
      ))}
    </div>
  );
};

export default OrderCheckList;
