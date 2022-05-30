import React, { FC, useCallback } from 'react';
import { Form, Formik } from 'formik';
import useFormConfirm from '@hooks/useFormConfirm';
import nfdApi from '@services/api';
import { updateRateTypeSaveStatus } from '@store/reducers/form';
import {
  ETableFormTypes,
  ETableTypes,
  IFormRateType,
  TFormikSubmit,
} from '@models/app';
import AdminEdit from '@components/common/adminEdit/AdminEdit';
import EditButtonList from '@components/common/editButtonList/EditButtonList';
import { RATE_TYPE_VALIDATION } from '@utils/constants/validation';
import { RATE_TYPE_INITIAL_VALUES } from '@utils/constants/tables';
import cl from './AddRateType.module.scss';

const AddRateType: FC = () => {
  const [postRateType] = nfdApi.usePostRateTypeIdMutation();

  const sumbitHandler = useFormConfirm(
    postRateType as (data: object) => Promise<unknown>,
    updateRateTypeSaveStatus,
    ETableTypes.RATE_TYPE,
  );

  const onSubmit = useCallback<TFormikSubmit<IFormRateType>>(
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
        initialValues={RATE_TYPE_INITIAL_VALUES}
        validationSchema={RATE_TYPE_VALIDATION}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={onSubmit}
      >
        <Form className={cl.form}>
          <AdminEdit
            type={ETableTypes.RATE_TYPE}
            formType={ETableFormTypes.ADD}
          />
          <EditButtonList
            formType={ETableFormTypes.ADD}
            pageType={ETableTypes.RATE_TYPE}
          />
        </Form>
      </Formik>
    </main>
  );
};

export default AddRateType;
