import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import { updateRateTypeSaveStatus } from '@store/reducers/form';
import { ETableFormTypes, ETableTypes } from '@models/app';
import AdminEdit from '@components/common/adminEdit/AdminEdit';
import EditButtonList from '@components/common/editButtonList/EditButtonList';
import { RATE_TYPE_VALIDATION } from '@utils/constants/validation';
import cl from './AddRateType.module.scss';

const AddRateType: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [postRateTypeId] = nfdApi.usePostRateTypeIdMutation();

  return (
    <main className={cl.container}>
      <Formik
        initialValues={{
          name: '',
          duration: '',
        }}
        validationSchema={RATE_TYPE_VALIDATION}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            postRateTypeId({
              name: values.name,
              unit: values.duration,
            }).then((data) => {
              const result = (data as { data: unknown }).data;

              dispatch(updateRateTypeSaveStatus(Boolean(result)));
              setTimeout(() => {
                dispatch(updateRateTypeSaveStatus(null));
              }, 4000);
              navigate('/admin/tariffType');
            });

            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className={cl.form}>
          <AdminEdit
            type={ETableTypes.RATE_TYPE}
            formType={ETableFormTypes.ADD}
          />
          <EditButtonList formType={ETableFormTypes.ADD} />
        </Form>
      </Formik>
    </main>
  );
};

export default AddRateType;
