import React, { FC, useCallback, useEffect } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import classNames from 'classnames';
import { Button, Upload } from 'antd';
import useFormConfirm from '@hooks/useFormConfirm';
import nfdApi from '@services/api';
import { useAppDispatch, useAppSelector } from '@store/store';
import {
  ETableFormTypes,
  ETableTypes,
  IFormCar,
  TFormikSubmit,
} from '@models/app';
import { updateCarSaveStatus } from '@store/reducers/form';
import { updataCarAllFilters } from '@store/reducers/filters';
import AdminEdit from '@components/common/adminEdit/AdminEdit';
import EditButtonList from '@components/common/editButtonList/EditButtonList';
import FormProgress from '@components/common/formProgress/FormProgress';
import { CAR_VALIDATION } from '@utils/constants/validation';
import { CAR_INITIAL_VALUES, NO_PHOTO } from '@utils/constants/tables';
import noPhotoIcon from '@assets/svg/no-photo.svg';
import cl from './AddCar.module.scss';

const AddCar: FC = () => {
  const dispatch = useAppDispatch();
  const categoryList = useAppSelector(
    (state) => state.filters.car.all.category,
  );
  const [postCar] = nfdApi.usePostCarMutation();
  const { data: categoryRequest } = nfdApi.useGetCategoryListQuery({
    page: 0,
  });

  useEffect(() => {
    if (categoryRequest?.data) {
      const filteredData = categoryRequest.data.map((item) => ({
        name: item.name,
        id: item.id,
      }));

      dispatch(updataCarAllFilters(filteredData));
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

  const sumbitHandler = useFormConfirm(
    postCar as (data: object) => Promise<unknown>,
    updateCarSaveStatus,
    ETableTypes.CAR,
  );

  const onSubmit = useCallback<TFormikSubmit<IFormCar>>(
    (values, { setSubmitting }) => {
      setTimeout(() => {
        sumbitHandler({
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
        });

        setSubmitting(false);
      }, 400);
    },
    [],
  );

  return (
    <main className={cl.container}>
      <Formik
        initialValues={CAR_INITIAL_VALUES}
        validationSchema={CAR_VALIDATION}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, setFieldError, errors }) => (
          <Form className={cl.form}>
            <div className={cl.firstPart}>
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
                  className={cl.upload}
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
                formType={ETableFormTypes.ADD}
              />
              <EditButtonList
                formType={ETableFormTypes.ADD}
                pageType={ETableTypes.CAR}
              />
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default AddCar;
