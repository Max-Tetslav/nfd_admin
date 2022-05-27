import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import { updateCategorySaveStatus } from '@store/reducers/form';
import { ETableFormTypes, ETableTypes } from '@models/app';
import AdminEdit from '@components/common/adminEdit/AdminEdit';
import EditButtonList from '@components/common/editButtonList/EditButtonList';
import { CATEGORY_VALIDATION } from '@utils/constants/validation';
import cl from './AddCategory.module.scss';

const AddCategory: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [postCategory] = nfdApi.usePostCategoryMutation();

  return (
    <main className={cl.container}>
      <Formik
        initialValues={{
          name: '',
          description: '',
        }}
        validationSchema={CATEGORY_VALIDATION}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            postCategory(values).then((data) => {
              const result = (
                data as {
                  data: unknown;
                }
              ).data;

              dispatch(updateCategorySaveStatus(Boolean(result)));
              setTimeout(() => {
                dispatch(updateCategorySaveStatus(null));
              }, 4000);
              navigate('/admin/category');
            });

            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className={cl.form}>
          <AdminEdit
            type={ETableTypes.CATEGORY}
            formType={ETableFormTypes.ADD}
          />
          <EditButtonList formType={ETableFormTypes.ADD} />
        </Form>
      </Formik>
    </main>
  );
};

export default AddCategory;
