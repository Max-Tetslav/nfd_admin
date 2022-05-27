import React, { FC, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import {
  updateCityCurrent,
  updateCityList,
  updatePointDeleteStatus,
  updatePointSaveStatus,
} from '@store/reducers/form';
import { ETableFormTypes, ETableTypes } from '@models/app';
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

  useEffect(() => {
    if (pointRequest?.data) {
      dispatch(updateCityCurrent(pointRequest.data.cityId.id));
    }
  }, [pointRequest]);

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

  return isLoading ? (
    <Spin loading={isLoading} />
  ) : (
    <main className={cl.container}>
      <Formik
        initialValues={{
          name: pointRequest?.data.name || '',
          city: pointRequest?.data.cityId.id || '',
          address: pointRequest?.data.address || '',
        }}
        validationSchema={POINT_VALIDATION}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            putPoint({
              id: getIdFromParams(pointId as string),
              data: {
                name: values.name,
                address: values.address,
                cityId: {
                  id: values.city,
                },
              },
            }).then((data) => {
              const result = (data as { data: unknown }).data;

              dispatch(updatePointSaveStatus(Boolean(result)));
              setTimeout(() => {
                dispatch(updatePointSaveStatus(null));
              }, 4000);
              navigate('/admin/point');
            });

            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className={cl.form}>
          <AdminEdit type={ETableTypes.POINT} formType={ETableFormTypes.EDIT} />
          <EditButtonList
            formType={ETableFormTypes.EDIT}
            deleteHandler={deleteHandler}
          />
        </Form>
      </Formik>
    </main>
  );
};

export default EditPoint;
