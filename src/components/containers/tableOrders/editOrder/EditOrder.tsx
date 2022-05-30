import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import useFormConfirm from '@hooks/useFormConfirm';
import nfdApi from '@services/api';
import { useAppDispatch, useAppSelector } from '@store/store';
import {
  ETableFormTypes,
  ETableTypes,
  IFormOrder,
  TFormikSubmit,
} from '@models/app';
import {
  updateCarColors,
  updateCarList,
  updateOrderDeleteStatus,
  updateOrderSaveStatus,
  updatePointDataList,
  updatePointList,
  updateStatusList,
} from '@store/reducers/form';
import AdminEdit from '@components/common/adminEdit/AdminEdit';
import EditButtonList from '@components/common/editButtonList/EditButtonList';
import OrderEditPrice from '@components/common/orderEditPrice/OrderEditPrice';
import Spin from '@components/common/spin/Spin';
import { NO_PHOTO } from '@utils/constants/tables';
import getDurationString from '@utils/helpers/getDurationString';
import getIdFromParams from '@utils/helpers/getIdFromParams';
import { ORDER_VALIDATION } from '@utils/constants/validation';
import noPhotoIcon from '@assets/svg/no-photo.svg';
import loadingIcon from '@assets/svg/loading.svg';
import cl from './EditOrder.module.scss';

const EditOrder: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id: orderId } = useParams();
  const carList = useAppSelector((state) => state.form.car.list);
  const statusList = useAppSelector((state) => state.form.status.list);
  const pointList = useAppSelector((state) => state.form.point.list);
  const colorList = useAppSelector((state) => state.form.car.colors);
  const currentCar = useAppSelector((state) => state.form.car.current);
  const [getCar, carResponse] = nfdApi.useLazyGetCarQuery();
  const [putOrder] = nfdApi.usePutOrderMutation();
  const [deleteorder] = nfdApi.useDeleteOrderMutation();
  const { data: orderRequest, isFetching } = nfdApi.useGetOrderQuery(
    getIdFromParams(orderId as string),
  );
  const { data: statusRequest } = nfdApi.useGetStatusListQuery({
    page: 0,
  });
  const { data: carListRequest } = nfdApi.useGetCarListQuery({
    page: 0,
  });
  const { data: pointRequest } = nfdApi.useGetPointListQuery({
    page: 0,
  });

  useEffect(() => {
    if (statusRequest?.data) {
      const filteredData = statusRequest.data.map((item) => ({
        name: item.name,
        id: item.id,
      }));

      dispatch(updateStatusList(filteredData));
    }
  }, [statusRequest]);

  useEffect(() => {
    if (pointRequest?.data) {
      const filteredData = pointRequest.data.map((item) => ({
        name: `${item.cityId?.name}, ${item.address}`,
        id: item.id,
      }));

      const cityData = pointRequest.data.map((item) => ({
        city: item.cityId?.id || '',
        point: item.id || '',
      }));

      dispatch(updatePointDataList(cityData));
      dispatch(updatePointList(filteredData));
    }
  }, [pointRequest]);

  useEffect(() => {
    if (carListRequest?.data) {
      const filteredData = carListRequest.data.map((item) => ({
        name: item.name,
        id: item.id,
      }));

      dispatch(updateCarList(filteredData));
    }
  }, [carListRequest]);

  useEffect(() => {
    if (currentCar === '') {
      dispatch(updateCarColors([]));
    }

    if (currentCar) {
      getCar(currentCar);
      dispatch(updateCarColors(null));
    }
  }, [currentCar]);

  useEffect(() => {
    if (carListRequest?.data && carResponse.data) {
      const filteredData = carResponse.data.data.colors?.map((item) => ({
        name: item,
        id: item,
      }));

      dispatch(updateCarColors(filteredData || []));
    }
  }, [carResponse, carListRequest]);

  const carNameHandler = useCallback(
    (id: string) => {
      if (carList?.length) {
        const carName = carList.filter((item) => item.id === id)[0]?.name;

        return carName;
      }
    },
    [carList],
  );

  const statusNameHandler = useCallback(
    (id: string) => {
      if (statusList?.length) {
        const statusName = statusList.filter((item) => item.id === id)[0]?.name;

        return statusName;
      }
    },
    [statusList],
  );

  const colorNameHandler = useCallback(
    (id: string) => {
      if (colorList?.length) {
        const colorName = colorList.filter((item) => item.id === id)[0]?.name;

        return colorName;
      }
    },
    [colorList],
  );

  const pointNameHandler = useCallback(
    (id: string) => {
      if (pointList?.length) {
        const pointName = pointList.filter((item) => item.id === id)[0]?.name;

        return pointName;
      }
    },
    [pointList],
  );

  const imgPathHandler = useCallback(
    (imgSrc: string, carId: string) => {
      if (carResponse.data?.data && carId) {
        return carId !== carResponse.data.data.id
          ? loadingIcon
          : carResponse.data.data.thumbnail?.path;
      }

      return imgSrc;
    },
    [carResponse.data],
  );

  const deleteHandler = useCallback(() => {
    deleteorder(getIdFromParams(orderId as string)).then((data) => {
      const result = (
        data as {
          data: unknown;
        }
      ).data;

      dispatch(updateOrderDeleteStatus(Boolean(result)));
      setTimeout(() => {
        dispatch(updateOrderDeleteStatus(null));
      }, 4000);
      navigate('/admin/order');
    });
  }, []);

  const sumbitHandler = useFormConfirm(
    putOrder as (data: object) => Promise<unknown>,
    updateOrderSaveStatus,
    ETableTypes.ORDER,
  );

  const onSubmit = useCallback<TFormikSubmit<IFormOrder>>(
    (values, { setSubmitting }) => {
      setTimeout(() => {
        sumbitHandler({
          id: getIdFromParams(orderId as string),
          data: {
            carId: {
              id: values.car,
            },
            pointId: {
              id: values.point,
            },
            orderStatusId: {
              id: values.status,
            },
            isFullTank: values.tank,
            isNeedChildChair: values.chair,
            isRightWheel: values.wheel,
            rateId: {
              id: orderRequest?.data.rateId?.id || '',
            },
            price: values.price,
            cityId: {
              id: values.city,
            },
            color: values.color,
            dateFrom: values.dateFrom,
            dateTo: values.dateTo,
          },
        });

        setSubmitting(false);
      }, 400);
    },
    [orderId, orderRequest],
  );

  const initialValues = useMemo(() => {
    return {
      point: orderRequest?.data.pointId?.id || '',
      rate: orderRequest?.data.rateId?.id || '',
      status: orderRequest?.data.orderStatusId?.id || '',
      color: orderRequest?.data.color || '',
      car: orderRequest?.data.carId?.id || '',
      tank: orderRequest?.data.isFullTank || false,
      chair: orderRequest?.data.isNeedChildChair || false,
      wheel: orderRequest?.data.isRightWheel || false,
      dateFrom: orderRequest?.data.dateFrom || 0,
      dateTo: orderRequest?.data.dateTo || 0,
      totalTime:
        (orderRequest?.data?.dateTo || 0) - (orderRequest?.data?.dateFrom || 0),
      price: orderRequest?.data.price || 0,
      city: orderRequest?.data.cityId?.id || '',
      imgSrc: orderRequest?.data.carId?.thumbnail?.path || '',
    };
  }, [orderRequest]);

  return isFetching ? (
    <Spin loading={isFetching} />
  ) : (
    <main className={cl.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={ORDER_VALIDATION}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={onSubmit}
      >
        {({ values }) => (
          <Form className={cl.form}>
            <div className={cl.firstPart}>
              <div className={cl.carInfoBox}>
                <img
                  className={cl.carImage}
                  src={imgPathHandler(values.imgSrc, values.car) || noPhotoIcon}
                  alt={values.car || NO_PHOTO}
                  draggable={false}
                />
                <div className={cl.textBox}>
                  <p className={cl.orderInfo}>
                    Статуc:{' '}
                    <span>
                      {statusNameHandler(values.status) || 'Не установлен'}
                    </span>
                  </p>
                  <p className={cl.orderInfo}>
                    Авто:{' '}
                    <span>{carNameHandler(values.car) || 'Не установлен'}</span>
                  </p>
                  <p className={cl.orderInfo}>
                    Цвет:{' '}
                    <span>
                      {colorNameHandler(values.color) || 'Не установлен'}
                    </span>
                  </p>
                  <p className={cl.orderInfo}>
                    Продолжительность:{' '}
                    <span>
                      {getDurationString(values.totalTime) || 'Не установлена'}
                    </span>
                  </p>
                  <p className={cl.orderInfo}>
                    Пункт выдачи:{' '}
                    <span>
                      {pointNameHandler(values.point) || 'Не установлен'}
                    </span>
                  </p>
                </div>
                <OrderEditPrice />
              </div>
            </div>
            <div className={cl.secondPart}>
              <AdminEdit
                type={ETableTypes.ORDER}
                formType={ETableFormTypes.EDIT}
              />
              <EditButtonList
                formType={ETableFormTypes.EDIT}
                pageType={ETableTypes.ORDER}
                deleteHandler={deleteHandler}
              />
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default EditOrder;
