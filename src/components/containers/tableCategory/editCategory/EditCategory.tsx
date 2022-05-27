import React, { FC, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import {
  updateCategoryDeleteStatus,
  updateCategorySaveStatus,
} from '@store/reducers/form';
import { ETableFormTypes, ETableTypes } from '@models/app';
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

  return isLoading ? (
    <Spin loading={isLoading} />
  ) : (
    <main className={cl.container}>
      <Formik
        initialValues={{
          name: categoryRequest?.data.name || '',
          description: categoryRequest?.data.description || '',
        }}
        validationSchema={CATEGORY_VALIDATION}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            putCategory({
              data: values,
              id: getIdFromParams(categoryId as string),
            }).then((data) => {
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

export default EditCategory;
