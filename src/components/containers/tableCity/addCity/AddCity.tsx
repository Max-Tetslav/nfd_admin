import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import { updateCitySaveStatus } from '@store/reducers/form';
import { ETableFormTypes, ETableTypes } from '@models/app';
import AdminEdit from '@components/common/adminEdit/AdminEdit';
import EditButtonList from '@components/common/editButtonList/EditButtonList';
import { NAME_VALIDATION } from '@utils/constants/validation';
import cl from './AddCity.module.scss';

const AddCity: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [postCity] = nfdApi.usePostCityMutation();

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
            postCity(values).then((data) => {
              const result = (
                data as {
                  data: unknown;
                }
              ).data;

              dispatch(updateCitySaveStatus(Boolean(result)));
              setTimeout(() => {
                dispatch(updateCitySaveStatus(null));
              }, 4000);
              navigate('/admin/city');
            });

            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className={cl.form}>
          <AdminEdit type={ETableTypes.CITY} formType={ETableFormTypes.ADD} />
          <EditButtonList formType={ETableFormTypes.ADD} />
        </Form>
      </Formik>
    </main>
  );
};

export default AddCity;
