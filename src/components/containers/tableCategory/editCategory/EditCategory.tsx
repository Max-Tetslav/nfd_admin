import React, { FC, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import useFormConfirm from '@hooks/useFormConfirm';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import {
  updateCategoryDeleteStatus,
  updateCategorySaveStatus,
} from '@store/reducers/form';
import {
  ETableFormTypes,
  ETableTypes,
  IFormCategory,
  TFormikSubmit,
} from '@models/app';
import Spin from '@components/common/spin/Spin';
import AdminEdit from '@components/common/adminEdit/AdminEdit';
import EditButtonList from '@components/common/editButtonList/EditButtonList';
import getIdFromParams from '@utils/helpers/getIdFromParams';
import { CATEGORY_VALIDATION } from '@utils/constants/validation';
import cl from './EditCategory.module.scss';

const EditCategory: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id: categoryId } = useParams();

  const { data: categoryRequest, isLoading } = nfdApi.useGetCategoryQuery(
    getIdFromParams(categoryId as string),
  );
  const [putCategory] = nfdApi.usePutCategoryMutation();
  const [deleteCategory] = nfdApi.useDeleteCategoryMutation();

  const deleteHandler = useCallback(() => {
    deleteCategory(getIdFromParams(categoryId as string)).then((data) => {
      const result = (
        data as {
          data: unknown;
        }
      ).data;

      dispatch(updateCategoryDeleteStatus(Boolean(result)));
      setTimeout(() => {
        dispatch(updateCategoryDeleteStatus(null));
      }, 4000);
      navigate('/admin/category');
    });
  }, []);

  const sumbitHandler = useFormConfirm(
    putCategory as (data: object) => Promise<unknown>,
    updateCategorySaveStatus,
    ETableTypes.CATEGORY,
  );

  const onSubmit = useCallback<TFormikSubmit<IFormCategory>>(
    (values, { setSubmitting }) => {
      setTimeout(() => {
        sumbitHandler({
          data: values,
          id: getIdFromParams(categoryId as string),
        });

        setSubmitting(false);
      }, 400);
    },
    [categoryId],
  );

  const initialValues = useMemo(() => {
    return {
      name: categoryRequest?.data.name || '',
      description: categoryRequest?.data.description || '',
    };
  }, [categoryRequest]);

  return isLoading ? (
    <Spin loading={isLoading} />
  ) : (
    <main className={cl.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={CATEGORY_VALIDATION}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={onSubmit}
      >
        <Form className={cl.form}>
          <AdminEdit
            type={ETableTypes.CATEGORY}
            formType={ETableFormTypes.EDIT}
          />
          <EditButtonList
            formType={ETableFormTypes.EDIT}
            pageType={ETableTypes.CATEGORY}
            deleteHandler={deleteHandler}
          />
        </Form>
      </Formik>
    </main>
  );
};

export default EditCategory;
