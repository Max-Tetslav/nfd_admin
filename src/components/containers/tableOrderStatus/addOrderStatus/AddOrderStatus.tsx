import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import { updateStatusSaveStatus } from '@store/reducers/form';
import { ETableFormTypes, ETableTypes } from '@models/app';
import AdminEdit from '@components/common/adminEdit/AdminEdit';
import EditButtonList from '@components/common/editButtonList/EditButtonList';
import { NAME_VALIDATION } from '@utils/constants/validation';
import cl from './AddOrderStatus.module.scss';

const AddOrderStatus: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [postStatus] = nfdApi.usePostStatusMutation();

  return (
    <main className={cl.container}>
      <Formik
        initialValues={{
          name: '',
        }}
        validationSchema={NAME_VALIDATION}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            postStatus(values).then((data) => {
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
          <AdminEdit type={ETableTypes.STATUS} formType={ETableFormTypes.ADD} />
          <EditButtonList formType="add" />
        </Form>
      </Formik>
    </main>
  );
};

export default AddOrderStatus;
