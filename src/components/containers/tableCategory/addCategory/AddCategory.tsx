import React, { FC, useCallback } from 'react';
import { Form, Formik } from 'formik';
import useFormConfirm from '@hooks/useFormConfirm';
import nfdApi from '@services/api';
import { updateCategorySaveStatus } from '@store/reducers/form';
import {
  ETableFormTypes,
  ETableTypes,
  IFormCategory,
  TFormikSubmit,
} from '@models/app';
import AdminEdit from '@components/common/adminEdit/AdminEdit';
import EditButtonList from '@components/common/editButtonList/EditButtonList';
import { CATEGORY_VALIDATION } from '@utils/constants/validation';
import { CATEGORY_INITIAL_VALUES } from '@utils/constants/tables';
import cl from './AddCategory.module.scss';

const AddCategory: FC = () => {
  const [postCategory] = nfdApi.usePostCategoryMutation();

  const sumbitHandler = useFormConfirm(
    postCategory as (data: object) => Promise<unknown>,
    updateCategorySaveStatus,
    ETableTypes.CATEGORY,
  );

  const onSubmit = useCallback<TFormikSubmit<IFormCategory>>(
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
        initialValues={CATEGORY_INITIAL_VALUES}
        validationSchema={CATEGORY_VALIDATION}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={onSubmit}
      >
        <Form className={cl.form}>
          <AdminEdit
            type={ETableTypes.CATEGORY}
            formType={ETableFormTypes.ADD}
          />
          <EditButtonList
            formType={ETableFormTypes.ADD}
            pageType={ETableTypes.CATEGORY}
          />
        </Form>
      </Formik>
    </main>
  );
};

export default AddCategory;
