import AdminEdit from '@components/common/adminEdit/AdminEdit';
import EditButtonList from '@components/common/editButtonList/EditButtonList';
import { Form, Formik } from 'formik';
import React, { FC, useCallback, useEffect } from 'react';
import { ETableFormTypes, ETableTypes } from '@models/app';
import nfdApi from '@services/api';
import getIdFromParams from '@utils/helpers/getIdFromParams';
import { useNavigate, useParams } from 'react-router-dom';
import Spin from '@components/common/spin/Spin';
import {
  updateCarColors,
  updateCarCurrentImg,
  updateCarList,
  updateOrderDeleteStatus,
  updateOrderSaveStatus,
  updatePointDataList,
  updatePointList,
  updateStatusList,
} from '@store/reducers/form';
import { useAppDispatch, useAppSelector } from '@store/store';
import OrderEditPrice from '@components/common/orderEditPrice/OrderEditPrice';
import noPhotoIcon from '@assets/svg/no-photo.svg';
import { NO_PHOTO } from '@utils/constants/tables';
import getDurationString from '@utils/helpers/getDurationString';
import { ORDER_VALIDATION } from '@utils/constants/validation';
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
  const currentCarImg = useAppSelector((state) => state.form.car.currentImg);
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
    if (currentCarImg) {
      dispatch(updateCarCurrentImg(''));
    }
  }, [currentCarImg]);

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
        name: `${item.cityId.name}, ${item.address}`,
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
    }
  }, [currentCar]);

  useEffect(() => {
    if (carListRequest?.data && carResponse.data) {
      const filteredData = carResponse.data.data.colors?.map((item) => ({
        name: item,
        id: item,
      }));

      dispatch(
        updateCarCurrentImg(carResponse.data.data.thumbnail?.path || ''),
      );
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

  return isFetching ? (
    <Spin loading={isFetching} />
  ) : (
    <main className={cl.container}>
      <Formik
        initialValues={{
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
            (orderRequest?.data?.dateTo || 0) -
            (orderRequest?.data?.dateFrom || 0),
          price: orderRequest?.data.price || 0,
          city: orderRequest?.data.cityId?.id || '',
          imgSrc:
            currentCarImg || orderRequest?.data.carId?.thumbnail?.path || '',
        }}
        validationSchema={ORDER_VALIDATION}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            putOrder({
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
            }).then((data) => {
              const result = (data as { data: unknown }).data;

              dispatch(updateOrderSaveStatus(Boolean(result)));
              setTimeout(() => {
                dispatch(updateOrderSaveStatus(null));
              }, 4000);
              navigate('/admin/order');
            });

            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values }) => (
          <Form className={cl.form}>
            <div className={cl.firstPart}>
              <div className={cl.carInfoBox}>
                <img
                  className={cl.carImage}
                  src={values.imgSrc || noPhotoIcon}
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
