import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import useFormConfirm from '@hooks/useFormConfirm';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import {
  updateCityList,
  updatePointDeleteStatus,
  updatePointSaveStatus,
} from '@store/reducers/form';
import {
  ETableFormTypes,
  ETableTypes,
  IFormPoint,
  TFormikSubmit,
} from '@models/app';
import Spin from '@components/common/spin/Spin';
import AdminEdit from '@components/common/adminEdit/AdminEdit';
import EditButtonList from '@components/common/editButtonList/EditButtonList';
import getIdFromParams from '@utils/helpers/getIdFromParams';
import { POINT_VALIDATION } from '@utils/constants/validation';
import cl from './EditPoint.module.scss';

const EditPoint: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id: pointId } = useParams();
  const [putPoint] = nfdApi.usePutPointMutation();
  const [deletePoint] = nfdApi.useDeletePointMutation();
  const { data: pointRequest, isLoading } = nfdApi.useGetPointQuery(
    getIdFromParams(pointId as string),
  );
  const { data: cityRequest } = nfdApi.useGetCityListQuery({
    page: 0,
  });

  useEffect(() => {
    if (cityRequest?.data) {
      const filteredData = cityRequest.data.map((item) => ({
        name: item.name,
        id: item.id,
      }));

      dispatch(updateCityList(filteredData));
    }
  }, [cityRequest]);

  const deleteHandler = useCallback(() => {
    deletePoint(getIdFromParams(pointId as string)).then((data) => {
      const result = (
        data as {
          data: unknown;
        }
      ).data;

      dispatch(updatePointDeleteStatus(Boolean(result)));
      setTimeout(() => {
        dispatch(updatePointDeleteStatus(null));
      }, 4000);
      navigate('/admin/point');
    });
  }, []);

  const sumbitHandler = useFormConfirm(
    putPoint as (data: object) => Promise<unknown>,
    updatePointSaveStatus,
    ETableTypes.POINT,
  );

  const onSubmit = useCallback<TFormikSubmit<IFormPoint>>(
    (values, { setSubmitting }) => {
      setTimeout(() => {
        sumbitHandler({
          id: getIdFromParams(pointId as string),
          data: {
            name: values.name,
            address: values.address,
            cityId: {
              id: values.city,
            },
          },
        });

        setSubmitting(false);
      }, 400);
    },
    [pointId],
  );

  const initialValues = useMemo(() => {
    return {
      name: pointRequest?.data.name || '',
      city: pointRequest?.data.cityId?.id || '',
      address: pointRequest?.data.address || '',
    };
  }, [pointRequest]);

  return isLoading ? (
    <Spin loading={isLoading} />
  ) : (
    <main className={cl.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={POINT_VALIDATION}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={onSubmit}
      >
        <Form className={cl.form}>
          <AdminEdit type={ETableTypes.POINT} formType={ETableFormTypes.EDIT} />
          <EditButtonList
            formType={ETableFormTypes.EDIT}
            pageType={ETableTypes.POINT}
            deleteHandler={deleteHandler}
          />
        </Form>
      </Formik>
    </main>
  );
};

export default EditPoint;
