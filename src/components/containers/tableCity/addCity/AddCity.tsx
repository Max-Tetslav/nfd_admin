import React, { FC, useCallback } from 'react';
import { Form, Formik } from 'formik';
import useFormConfirm from '@hooks/useFormConfirm';
import nfdApi from '@services/api';
import { updateCitySaveStatus } from '@store/reducers/form';
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
import cl from './AddCity.module.scss';

const AddCity: FC = () => {
  const [postCity] = nfdApi.usePostCityMutation();

  const sumbitHandler = useFormConfirm(
    postCity as (data: object) => Promise<unknown>,
    updateCitySaveStatus,
    ETableTypes.CITY,
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
          <AdminEdit type={ETableTypes.CITY} formType={ETableFormTypes.ADD} />
          <EditButtonList
            formType={ETableFormTypes.ADD}
            pageType={ETableTypes.CITY}
          />
        </Form>
      </Formik>
    </main>
  );
};

export default AddCity;
