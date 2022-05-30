import React, { FC, useCallback } from 'react';
import { Form, Formik } from 'formik';
import useFormConfirm from '@hooks/useFormConfirm';
import nfdApi from '@services/api';
import { updateStatusSaveStatus } from '@store/reducers/form';
import {
  ETableFormTypes,
  ETableTypes,
  IFormName,
  TFormikSubmit,
} from '@models/app';
import AdminEdit from '@components/common/adminEdit/AdminEdit';
import EditButtonList from '@components/common/editButtonList/EditButtonList';
import { NAME_VALIDATION } from '@utils/constants/validation';
import { NAME_INITIAL_VALUES } from '@utils/constants/tables';
import cl from './AddOrderStatus.module.scss';

const AddOrderStatus: FC = () => {
  const [postStatus] = nfdApi.usePostStatusMutation();

  const sumbitHandler = useFormConfirm(
    postStatus as (data: object) => Promise<unknown>,
    updateStatusSaveStatus,
    ETableTypes.STATUS,
  );

  const onSubmit = useCallback<TFormikSubmit<IFormName>>(
    (values, { setSubmitting }) => {
      setTimeout(() => {
        sumbitHandler(values);

        setSubmitting(false);
      }, 400);
    },
    [],
  );

  return (
    <main className={cl.container}>
      <Formik
        initialValues={NAME_INITIAL_VALUES}
        validationSchema={NAME_VALIDATION}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={onSubmit}
      >
        <Form className={cl.form}>
          <AdminEdit type={ETableTypes.STATUS} formType={ETableFormTypes.ADD} />
          <EditButtonList
            formType={ETableFormTypes.ADD}
            pageType={ETableTypes.STATUS}
          />
        </Form>
      </Formik>
    </main>
  );
};

export default AddOrderStatus;
