import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage, Form, Formik } from 'formik';
import classNames from 'classnames';
import { Button, Upload } from 'antd';
import useFormConfirm from '@hooks/useFormConfirm';
import nfdApi from '@services/api';
import { useAppDispatch, useAppSelector } from '@store/store';
import {
  updateCarDeleteStatus,
  updateCarSaveStatus,
} from '@store/reducers/form';
import { updataCarAllFilters } from '@store/reducers/filters';
import {
  ETableFormTypes,
  ETableTypes,
  IFormCar,
  TFormikSubmit,
} from '@models/app';
import AdminEdit from '@components/common/adminEdit/AdminEdit';
import EditButtonList from '@components/common/editButtonList/EditButtonList';
import FormProgress from '@components/common/formProgress/FormProgress';
import Spin from '@components/common/spin/Spin';
import { NO_PHOTO } from '@utils/constants/tables';
import getIdFromParams from '@utils/helpers/getIdFromParams';
import { CAR_VALIDATION } from '@utils/constants/validation';
import noPhotoIcon from '@assets/svg/no-photo.svg';
import cl from './EditCar.module.scss';

const EditCar: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id: carId } = useParams();
  const categoryList = useAppSelector(
    (state) => state.filters.car.all.category,
  );
  const [putCar] = nfdApi.usePutCarMutation();
  const [deleteCar] = nfdApi.useDeleteCarMutation();
  const { data: carRequest, isLoading } = nfdApi.useGetCarQuery(
    getIdFromParams(carId as string),
  );
  const { data: categoryRequest } = nfdApi.useGetCategoryListQuery({
    page: 0,
  });

  useEffect(() => {
    if (categoryList.length === 0) {
      if (categoryRequest?.data) {
        const filteredData = categoryRequest.data.map((item) => ({
          name: item.name,
          id: item.id,
        }));

        dispatch(updataCarAllFilters(filteredData));
      }
    }
  }, [categoryRequest]);

  const categoryNameHandler = useCallback(
    (id: string) => {
      if (categoryList.length) {
        const categoryName = categoryList.filter((item) => item.id === id)[0]
          .name;

        return categoryName;
      }
    },
    [categoryList.length],
  );

  const deleteHandler = useCallback(() => {
    deleteCar(getIdFromParams(carId as string)).then((data) => {
      const result = (
        data as {
          data: unknown;
        }
      ).data;

      dispatch(updateCarDeleteStatus(Boolean(result)));
      setTimeout(() => {
        dispatch(updateCarDeleteStatus(null));
      }, 4000);
      navigate('/admin/car');
    });
  }, []);

  const sumbitHandler = useFormConfirm(
    putCar as (data: object) => Promise<unknown>,
    updateCarSaveStatus,
    ETableTypes.CAR,
  );

  const onSubmit = useCallback<TFormikSubmit<IFormCar>>(
    (values, { setSubmitting }) => {
      setTimeout(() => {
        sumbitHandler({
          id: getIdFromParams(carId as string),
          data: {
            name: values.model,
            number: values.number,
            tank: Number(values.tank),
            colors: values.colorList,
            priceMin: Number(values.minPrice),
            priceMax: Number(values.maxPrice),
            description: values.description,
            categoryId: {
              id: values.category,
            },
            thumbnail: {
              size: Number(values.imgSize),
              originalname: values.imgName,
              mimetype: values.imgType,
              path: values.imgSrc,
            },
          },
        });

        setSubmitting(false);
      }, 400);
    },
    [carId],
  );

  const initialValues = useMemo(() => {
    return {
      model: carRequest?.data.name || '',
      category: carRequest?.data.categoryId?.id || '',
      number: carRequest?.data.number || '',
      minPrice: carRequest?.data.priceMin || 0,
      maxPrice: carRequest?.data.priceMax || 0,
      tank: carRequest?.data.tank || 0,
      description: carRequest?.data.description || '',
      imgSize: carRequest?.data.thumbnail?.size || 0,
      imgType: carRequest?.data.thumbnail?.mimetype || '',
      imgSrc: carRequest?.data.thumbnail?.path || '',
      imgName: carRequest?.data.thumbnail?.originalname || '',
      color: '',
      colorList: carRequest?.data.colors || [],
    };
  }, [carRequest]);

  return isLoading ? (
    <Spin loading={isLoading} />
  ) : (
    <main className={cl.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={CAR_VALIDATION}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, setFieldError, errors }) => (
          <Form className={cl.form}>
            <div className={cl.first}>
              <div className={cl.carInfoBox}>
                <img
                  className={cl.carImage}
                  src={values.imgSrc || noPhotoIcon}
                  alt={values.model || NO_PHOTO}
                  draggable={false}
                />
                <div className={cl.textBox}>
                  <p className={cl.carModel}>
                    {values.model || 'Нет названия'}
                  </p>
                  <p className={cl.carCategory}>
                    {values.category
                      ? categoryNameHandler(values.category)
                      : 'Нет категории'}
                  </p>
                </div>
                <Upload
                  maxCount={1}
                  showUploadList={false}
                  beforeUpload={(fileData) => {
                    const reader = new FileReader();

                    reader.onloadend = (e) => {
                      setFieldValue('imgSrc', e.target?.result);
                    };

                    if (fileData.size > 2000000) {
                      setFieldError(
                        'imgSize',
                        'Изображение превышает лимит в 2МБ',
                      );
                    } else {
                      setFieldError('imgSize', undefined);
                    }

                    setFieldValue('imgName', fileData.name);
                    setFieldValue('imgSize', fileData.size);
                    setFieldValue('imgType', fileData.type);

                    reader.readAsDataURL(fileData);

                    return false;
                  }}
                >
                  <div
                    className={classNames(cl.uploadBox, {
                      [cl.errorBorder]: errors.imgSize,
                    })}
                  >
                    <p
                      className={classNames(cl.uploadText, {
                        [cl.errorBorder]: errors.imgSize,
                      })}
                    >
                      {values.imgName || 'Выберите файл...'}
                    </p>
                    <Button className={cl.uploadButton}>Обзор</Button>
                    <ErrorMessage name="imgSize">
                      {(msg) => <span className={cl.uploadError}>{msg}</span>}
                    </ErrorMessage>
                  </div>
                </Upload>
              </div>
              <div className={cl.progressBox}>
                <p className={cl.progressText}>Заполнено</p>
                <FormProgress />
              </div>
              <div className={cl.descriptionBox}>
                <p>Описание</p>
                <p>{values.description || 'Нет описания'}</p>
              </div>
            </div>
            <div className={cl.secondPart}>
              <AdminEdit
                type={ETableTypes.CAR}
                formType={ETableFormTypes.EDIT}
              />
              <EditButtonList
                formType={ETableFormTypes.EDIT}
                pageType={ETableTypes.CAR}
                deleteHandler={deleteHandler}
              />
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default EditCar;
