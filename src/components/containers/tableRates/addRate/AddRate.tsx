import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import { updateRateSaveStatus, updateRateTypeList } from '@store/reducers/form';
import { ETableFormTypes, ETableTypes } from '@models/app';
import AdminEdit from '@components/common/adminEdit/AdminEdit';
import EditButtonList from '@components/common/editButtonList/EditButtonList';
import { RATE_VALIDATION } from '@utils/constants/validation';
import cl from './AddRate.module.scss';

const AddRate: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [postRate] = nfdApi.usePostRateMutation();
  const { data: rateTypeRequest } = nfdApi.useGetRateTypeListQuery({
    page: 0,
  });

  useEffect(() => {
    if (rateTypeRequest?.data) {
      const filteredData = rateTypeRequest.data.map((item) => ({
        name: item.name,
        id: item.id,
      }));

      dispatch(updateRateTypeList(filteredData));
    }
  }, [rateTypeRequest]);

  return (
    <main className={cl.container}>
      <Formik
        initialValues={{
          rateType: '',
          price: '',
        }}
        validationSchema={RATE_VALIDATION}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            postRate({
              price: Number(values.price),
              rateTypeId: {
                id: values.rateType,
              },
            }).then((data) => {
              const result = (data as { data: unknown }).data;

              dispatch(updateRateSaveStatus(Boolean(result)));
              setTimeout(() => {
                dispatch(updateRateSaveStatus(null));
              }, 4000);
              navigate('/admin/rate');
            });

            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className={cl.form}>
          <AdminEdit type={ETableTypes.RATE} formType={ETableFormTypes.ADD} />
          <EditButtonList formType="add" />
        </Form>
      </Formik>
    </main>
  );
};

export default AddRate;
