import React, { FC, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import {
  updateStatusDeleteStatus,
  updateStatusSaveStatus,
} from '@store/reducers/form';
import { ETableFormTypes, ETableTypes } from '@models/app';
import Spin from '@components/common/spin/Spin';
import AdminEdit from '@components/common/adminEdit/AdminEdit';
import EditButtonList from '@components/common/editButtonList/EditButtonList';
import getIdFromParams from '@utils/helpers/getIdFromParams';
import { NAME_VALIDATION } from '@utils/constants/validation';
import cl from './EditOrderStatus.module.scss';

const EditOrderStatus: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id: statusId } = useParams();
  const { data: statusRequest, isLoading } = nfdApi.useGetStatusQuery(
    getIdFromParams(statusId as string),
  );
  const [putStatus] = nfdApi.usePutStatusMutation();
  const [deleteStatus] = nfdApi.useDeleteStatusMutation();

  const deleteHandler = useCallback(() => {
    deleteStatus(getIdFromParams(statusId as string)).then((data) => {
      const result = (
        data as {
          data: unknown;
        }
      ).data;

      dispatch(updateStatusDeleteStatus(Boolean(result)));
      setTimeout(() => {
        dispatch(updateStatusDeleteStatus(null));
      }, 4000);
      navigate('/admin/status');
    });
  }, []);

  return isLoading ? (
    <Spin loading={isLoading} />
  ) : (
    <main className={cl.container}>
      <Formik
        initialValues={{
          name: statusRequest?.data.name || '',
        }}
        validationSchema={NAME_VALIDATION}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            putStatus({
              data: values,
              id: getIdFromParams(statusId as string),
            }).then((data) => {
              const result = (
                data as {
                  data: unknown;
                }
              ).data;

              dispatch(updateStatusSaveStatus(Boolean(result)));
              setTimeout(() => {
                dispatch(updateStatusSaveStatus(null));
              }, 4000);
              navigate('/admin/status');
            });

            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className={cl.form}>
          <AdminEdit
            type={ETableTypes.STATUS}
            formType={ETableFormTypes.EDIT}
          />
          <EditButtonList
            formType={ETableFormTypes.EDIT}
            deleteHandler={deleteHandler}
          />
        </Form>
      </Formik>
    </main>
  );
};

export default EditOrderStatus;
