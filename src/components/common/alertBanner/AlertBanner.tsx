import React, { FC, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { Alert } from 'antd';
import useGetItemName from '@hooks/useGetItemName';
import { useAppSelector } from '@store/store';
import closeIcon from '@assets/svg/banner-close.svg';
import errorIcon from '@assets/svg/banner-error.svg';
import okIcon from '@assets/svg/banner-ok.svg';
import cl from './AlertBanner.module.scss';

const AlertBanner: FC = () => {
  const rateSaveStatus = useAppSelector((state) => state.form.rate.save.ok);
  const rateDeleteStatus = useAppSelector((state) => state.form.rate.delete.ok);
  const carSaveStatus = useAppSelector((state) => state.form.car.save.ok);
  const carDeleteStatus = useAppSelector((state) => state.form.car.delete.ok);
  const orderSaveStatus = useAppSelector((state) => state.form.order.save.ok);
  const citySaveStatus = useAppSelector((state) => state.form.city.save.ok);
  const cityDeleteStatus = useAppSelector((state) => state.form.city.delete.ok);
  const pointSaveStatus = useAppSelector((state) => state.form.point.save.ok);
  const rateTypeSaveStatus = useAppSelector(
    (state) => state.form.rateType.save.ok,
  );
  const rateTypeDeleteStatus = useAppSelector(
    (state) => state.form.rateType.delete.ok,
  );
  const orderDeleteStatus = useAppSelector(
    (state) => state.form.order.delete.ok,
  );
  const statusSaveStatus = useAppSelector((state) => state.form.status.save.ok);
  const statusDeleteStatus = useAppSelector(
    (state) => state.form.status.delete.ok,
  );
  const pointDeleteStatus = useAppSelector(
    (state) => state.form.point.delete.ok,
  );
  const categorySaveStatus = useAppSelector(
    (state) => state.form.category.save.ok,
  );
  const categoryDeleteStatus = useAppSelector(
    (state) => state.form.category.delete.ok,
  );
  const completeStatus = useAppSelector(
    (state) => state.form.order.status.complete,
  );
  const cancelStatus = useAppSelector(
    (state) => state.form.order.status.cancel,
  );

  const itemName = useGetItemName(true);

  const actionName = useMemo(() => {
    if (categorySaveStatus) {
      return 'сохранена';
    }
    if (categoryDeleteStatus) {
      return 'удалена';
    }
    if (
      rateTypeSaveStatus ||
      rateSaveStatus ||
      carSaveStatus ||
      orderSaveStatus ||
      statusSaveStatus ||
      citySaveStatus ||
      pointSaveStatus
    ) {
      return 'сохранен';
    }
    if (
      rateTypeDeleteStatus ||
      rateDeleteStatus ||
      carDeleteStatus ||
      orderDeleteStatus ||
      statusDeleteStatus ||
      cityDeleteStatus ||
      pointDeleteStatus
    ) {
      return 'удален';
    }
  }, [
    rateTypeDeleteStatus,
    rateTypeSaveStatus,
    rateSaveStatus,
    rateDeleteStatus,
    carSaveStatus,
    carDeleteStatus,
    orderSaveStatus,
    orderDeleteStatus,
    statusSaveStatus,
    statusDeleteStatus,
    citySaveStatus,
    cityDeleteStatus,
    pointSaveStatus,
    pointDeleteStatus,
    categorySaveStatus,
    categoryDeleteStatus,
  ]);

  const getBanner = useCallback(
    (status: 'success' | 'error', orderAction?: 'complete' | 'cancel') => {
      const classes = classNames(
        cl.container,
        { [cl.success]: status === 'success' },
        { [cl.error]: status === 'error' },
      );

      let message: string;

      switch (orderAction) {
        case 'complete':
          message = 'Успех! Cтатус заказа изменен на "Завершенный"';
          break;
        case 'cancel':
          message = 'Успех! Cтатус заказа изменен на "Отмененный"';
          break;
        default:
          if (status === 'success') {
            message = `Успех, ${itemName} ${actionName}!`;
          } else {
            message = 'Ошибка! К сожалению, не удалось выполнить запрос';
          }
          break;
      }

      const icon = (
        <img src={status === 'success' ? okIcon : errorIcon} alt={status} />
      );

      return (
        <Alert
          className={classes}
          icon={icon}
          type={status}
          message={message}
          banner
          closable
          closeIcon={<img src={closeIcon} alt="close" />}
        />
      );
    },
    [itemName, actionName],
  );

  const content = useMemo(() => {
    if (completeStatus) {
      return getBanner('success', 'complete');
    }

    if (cancelStatus) {
      return getBanner('success', 'cancel');
    }

    if (
      rateTypeSaveStatus ||
      rateTypeDeleteStatus ||
      rateSaveStatus ||
      rateDeleteStatus ||
      citySaveStatus ||
      cityDeleteStatus ||
      pointDeleteStatus ||
      pointSaveStatus ||
      carDeleteStatus ||
      carSaveStatus ||
      orderDeleteStatus ||
      orderSaveStatus ||
      carDeleteStatus ||
      carSaveStatus ||
      categoryDeleteStatus ||
      categorySaveStatus ||
      statusSaveStatus ||
      statusDeleteStatus
    ) {
      return getBanner('success');
    }
    if (
      rateTypeSaveStatus === false ||
      rateTypeDeleteStatus === false ||
      rateSaveStatus === false ||
      rateDeleteStatus === false ||
      citySaveStatus === false ||
      cityDeleteStatus === false ||
      pointDeleteStatus === false ||
      pointSaveStatus === false ||
      carDeleteStatus === false ||
      carSaveStatus === false ||
      orderDeleteStatus === false ||
      orderSaveStatus === false ||
      carDeleteStatus === false ||
      carSaveStatus === false ||
      categoryDeleteStatus === false ||
      categorySaveStatus === false ||
      statusSaveStatus === false ||
      statusDeleteStatus === false ||
      completeStatus === false ||
      cancelStatus === false
    ) {
      return getBanner('error');
    }

    return null;
  }, [
    rateTypeDeleteStatus,
    rateTypeSaveStatus,
    rateSaveStatus,
    rateDeleteStatus,
    carSaveStatus,
    carDeleteStatus,
    orderSaveStatus,
    orderDeleteStatus,
    statusSaveStatus,
    statusDeleteStatus,
    citySaveStatus,
    cityDeleteStatus,
    pointSaveStatus,
    pointDeleteStatus,
    categorySaveStatus,
    categoryDeleteStatus,
    completeStatus,
    cancelStatus,
  ]);

  return content;
};

export default AlertBanner;
