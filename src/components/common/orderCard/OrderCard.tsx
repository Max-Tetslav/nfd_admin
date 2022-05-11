import React from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import { IOrderData } from '@models/data';
import completeIcon from '@assets/svg/complete.svg';
import cancelIcon from '@assets/svg/cancel.svg';
import editIcon from '@assets/svg/edit.svg';
import formatPrice from '@utils/helpers/formatPrice';
import formatDate from '@utils/helpers/formatDate';
import OrderCheckList from '../orderCheckList/OrderCheckList';
import cl from './OrderCard.module.scss';

interface IOrderCardProps {
  order: IOrderData;
}

const OrderCard: React.FC<IOrderCardProps> = ({
  order: {
    dateFrom,
    dateTo,
    color,
    carId,
    pointId,
    price,
    isFullTank,
    isNeedChildChair,
    isRightWheel,
  },
}) => {
  return (
    <div className={cl.container}>
      <img className={cl.img} src={carId.thumbnail.path} alt={carId.name} />
      <div className={cl.infoBox}>
        <p className={cl.name}>
          <strong>{carId.name.toLocaleUpperCase()}</strong>
          {' в '}
          <strong>{pointId.name}</strong>
          {`, ${pointId.address}`}
        </p>
        <p className={cl.dates}>
          {`${formatDate(dateFrom)} - ${formatDate(dateTo)}`}
        </p>
        <p className={cl.colorText}>
          {'Цвет: '}
          <strong>{color}</strong>
        </p>
      </div>
      <OrderCheckList
        tank={isFullTank}
        chair={isNeedChildChair}
        wheel={isRightWheel}
      />
      <div className={cl.priceBox}>{`${formatPrice(price)} ₽`}</div>
      <div className={cl.buttonBox}>
        <Button
          className={classNames(cl.button, cl.completeButton)}
          // onClick={completeHandler}
          icon={
            <img className={cl.buttonIcon} src={completeIcon} alt="complete" />
          }
        >
          Готово
        </Button>
        <Button
          className={classNames(cl.button, cl.cancelButton)}
          // onClick={cancelHandler}
          icon={<img className={cl.buttonIcon} src={cancelIcon} alt="cancel" />}
        >
          Отмена
        </Button>
        <Button
          className={classNames(cl.button, cl.editButton)}
          // onClick={editHandler}
          icon={<img className={cl.buttonIcon} src={editIcon} alt="edit" />}
        >
          Изменить
        </Button>
      </div>
    </div>
  );
};

export default OrderCard;
