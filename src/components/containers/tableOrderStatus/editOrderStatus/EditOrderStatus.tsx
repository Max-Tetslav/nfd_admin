import React, { FC, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import useFormConfirm from '@hooks/useFormConfirm';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import {
  updateStatusDeleteStatus,
  updateStatusSaveStatus,
} from '@store/reducers/form';
import {
  ETableFormTypes,
  ETableTypes,
  IFormName,
  TFormikSubmit,
} from '@models/app';
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
  const [putStatus] = nfdApi.usePutStatusMutation();
  const [deleteStatus] = nfdApi.useDeleteStatusMutation();
  const { data: statusRequest, isLoading } = nfdApi.useGetStatusQuery(
    getIdFromParams(statusId as string),
  );

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

  const sumbitHandler = useFormConfirm(
    putStatus as (data: object) => Promise<unknown>,
    updateStatusSaveStatus,
    ETableTypes.STATUS,
  );

  const onSubmit = useCallback<TFormikSubmit<IFormName>>(
    (values, { setSubmitting }) => {
      setTimeout(() => {
        sumbitHandler({
          id: getIdFromParams(statusId as string),
          data: values,
        });

        setSubmitting(false);
      }, 400);
    },
    [statusId],
  );

  const initialValues = useMemo(() => {
    return {
      name: statusRequest?.data.name || '',
    };
  }, [statusRequest]);

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
          <AdminEdit
            type={ETableTypes.STATUS}
            formType={ETableFormTypes.EDIT}
          />
          <EditButtonList
            formType={ETableFormTypes.EDIT}
            pageType={ETableTypes.STATUS}
            deleteHandler={deleteHandler}
          />
        </Form>
      </Formik>
    </main>
  );
};

export default EditOrderStatus;
