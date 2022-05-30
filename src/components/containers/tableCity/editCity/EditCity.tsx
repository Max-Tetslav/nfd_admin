import React, { FC, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import useFormConfirm from '@hooks/useFormConfirm';
import nfdApi from '@services/api';
import {
  updateCityDeleteStatus,
  updateCitySaveStatus,
} from '@store/reducers/form';
import { useAppDispatch } from '@store/store';
import { IPostResponse, IRateType } from '@models/data';
import {
  ETableFormTypes,
  ETableTypes,
  IFormName,
  TFormikSubmit,
} from '@models/app';
import AdminEdit from '@components/common/adminEdit/AdminEdit';
import EditButtonList from '@components/common/editButtonList/EditButtonList';
import Spin from '@components/common/spin/Spin';
import getIdFromParams from '@utils/helpers/getIdFromParams';
import { NAME_VALIDATION } from '@utils/constants/validation';
import cl from './EditCity.module.scss';

const EditCity: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id: cityId } = useParams();
  const [putCity] = nfdApi.usePutCityMutation();
  const [deleteCity] = nfdApi.useDeleteCityMutation();
  const { data: cityRequest, isLoading } = nfdApi.useGetCityQuery(
    getIdFromParams(cityId as string),
  );

  const deleteHandler = useCallback(() => {
    deleteCity(getIdFromParams(cityId as string)).then((data) => {
      const result = (
        data as {
          data: IPostResponse<IRateType>;
        }
      ).data;

      dispatch(updateCityDeleteStatus(Boolean(result)));
      setTimeout(() => {
        dispatch(updateCityDeleteStatus(null));
      }, 4000);
      navigate('/admin/city');
    });
  }, []);

  const sumbitHandler = useFormConfirm(
    putCity as (data: object) => Promise<unknown>,
    updateCitySaveStatus,
    ETableTypes.CITY,
  );

  const onSubmit = useCallback<TFormikSubmit<IFormName>>(
    (values, { setSubmitting }) => {
      setTimeout(() => {
        sumbitHandler({
          data: values,
          id: getIdFromParams(cityId as string),
        });

        setSubmitting(false);
      }, 400);
    },
    [cityId],
  );

  const initialValues = useMemo(() => {
    return {
      name: cityRequest?.data.name || '',
    };
  }, [cityRequest]);

  return isLoading ? (
    <Spin loading={isLoading} />
  ) : (
    <main className={cl.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={NAME_VALIDATION}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={onSubmit}
      >
        <Form className={cl.form}>
          <AdminEdit type={ETableTypes.CITY} formType={ETableFormTypes.EDIT} />
          <EditButtonList
            formType={ETableFormTypes.EDIT}
            pageType={ETableTypes.CITY}
            deleteHandler={deleteHandler}
          />
        </Form>
      </Formik>
    </main>
  );
};

export default EditCity;
