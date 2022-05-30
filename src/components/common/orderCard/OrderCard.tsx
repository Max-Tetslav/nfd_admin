import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import useModalConfirm from '@hooks/useModalConfirm/useModalConfirm';
import { IOrderData, TPostOrderData } from '@models/data';
import completeIcon from '@assets/svg/complete.svg';
import cancelIcon from '@assets/svg/cancel.svg';
import editIcon from '@assets/svg/edit.svg';
import noPhotoIcon from '@assets/svg/no-photo.svg';
import formatPrice from '@utils/helpers/formatPrice';
import formatDate from '@utils/helpers/formatDate';
import { NO_PHOTO } from '@utils/constants/tables';
import {
  updateOrderStatusCancel,
  updateOrderStatusComplete,
} from '@store/reducers/form';
import { useAppDispatch } from '@store/store';
import { CANCEL_STATUS_ID, COMPLETE_STATUS_ID } from '@utils/constants/api';
import OrderCheckList from '../orderCheckList/OrderCheckList';
import cl from './OrderCard.module.scss';

interface IOrderCardProps {
  order: IOrderData;
  actionHandler: (id: string, orderData: TPostOrderData) => Promise<unknown>;
  editHandler: (id: string) => void;
}

const OrderCard: React.FC<IOrderCardProps> = ({
  order: {
    cityId,
    dateFrom,
    dateTo,
    color,
    carId,
    pointId,
    price,
    isFullTank,
    isNeedChildChair,
    isRightWheel,
    rateId,
    id,
  },
  actionHandler,
  editHandler,
}) => {
  const dispatch = useAppDispatch();
  const completeConfirm = useModalConfirm('complete');
  const cancelConfirm = useModalConfirm('cancel');

  const getUpdatedOrder = useCallback((statusId: string) => {
    return {
      price: price || 0,
      carId: {
        id: carId?.id || '',
      },
      cityId: {
        id: cityId?.id || '',
      },
      color: color || '',
      isFullTank,
      isNeedChildChair,
      isRightWheel,
      pointId: {
        id: pointId?.id || '',
      },
      orderStatusId: {
        id: statusId,
      },
      dateFrom: dateFrom || 0,
      dateTo: dateTo || 0,
      rateId: {
        id: rateId?.id || '',
      },
    };
  }, []);

  const completeHandler = useCallback(() => {
    actionHandler(id, getUpdatedOrder(COMPLETE_STATUS_ID)).then((data) => {
      const result = (
        data as {
          data: unknown;
        }
      ).data;

      dispatch(updateOrderStatusComplete(Boolean(result)));
      setTimeout(() => {
        dispatch(updateOrderStatusComplete(null));
      }, 4000);
    });
  }, []);

  const cancelHandler = useCallback(() => {
    actionHandler(id, getUpdatedOrder(CANCEL_STATUS_ID)).then((data) => {
      const result = (
        data as {
          data: unknown;
        }
      ).data;

      dispatch(updateOrderStatusCancel(Boolean(result)));
      setTimeout(() => {
        dispatch(updateOrderStatusCancel(null));
      }, 4000);
    });
  }, []);

  const onCancel = useCallback(() => {
    cancelConfirm(null, cancelHandler);
  }, []);

  const onComplete = useCallback(() => {
    completeConfirm(null, completeHandler);
  }, []);

  const onEdit = useCallback(() => {
    editHandler(id);
  }, []);

  const address = useMemo(() => {
    if (!cityId?.name && !pointId?.address && !pointId?.name) {
      return ' Адрес не указан';
    }

    return (
      <>
        {carId?.name && (cityId?.name || pointId?.name) ? ' в ' : ''}
        <strong>{cityId?.name || pointId?.name || ''}</strong>
        {pointId?.address ? `, ${pointId.address}` : ''}
      </>
    );
  }, []);

  return (
    <div className={cl.container}>
      <img
        className={cl.img}
        src={carId?.thumbnail.path || noPhotoIcon}
        alt={carId?.name || NO_PHOTO}
      />
      <div className={cl.infoBox}>
        <p className={cl.name}>
          <strong>{carId?.name.toLocaleUpperCase() || ''}</strong>
          {address}
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
      <div className={cl.priceBox}>{formatPrice(price || 0)}</div>
      <div className={cl.buttonBox}>
        <Button
          className={classNames(cl.button, cl.completeButton)}
          onClick={onComplete}
          icon={
            <img className={cl.buttonIcon} src={completeIcon} alt="complete" />
          }
        >
          Готово
        </Button>
        <Button
          className={classNames(cl.button, cl.cancelButton)}
          onClick={onCancel}
          icon={<img className={cl.buttonIcon} src={cancelIcon} alt="cancel" />}
        >
          Отмена
        </Button>
        <Button
          className={classNames(cl.button, cl.editButton)}
          onClick={onEdit}
          icon={<img className={cl.buttonIcon} src={editIcon} alt="edit" />}
        >
          Изменить
        </Button>
      </div>
    </div>
  );
};

export default OrderCard;
