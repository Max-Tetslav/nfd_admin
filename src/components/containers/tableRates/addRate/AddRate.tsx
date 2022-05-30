import React, { FC, useCallback, useEffect } from 'react';
import { Form, Formik } from 'formik';
import useFormConfirm from '@hooks/useFormConfirm';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import { updateRateSaveStatus, updateRateTypeList } from '@store/reducers/form';
import {
  ETableFormTypes,
  ETableTypes,
  IFormRate,
  TFormikSubmit,
} from '@models/app';
import AdminEdit from '@components/common/adminEdit/AdminEdit';
import EditButtonList from '@components/common/editButtonList/EditButtonList';
import { RATE_VALIDATION } from '@utils/constants/validation';
import { RATE_INITIAL_VALUES } from '@utils/constants/tables';
import cl from './AddRate.module.scss';

const AddRate: FC = () => {
  const dispatch = useAppDispatch();

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

  const sumbitHandler = useFormConfirm(
    postRate as (data: object) => Promise<unknown>,
    updateRateSaveStatus,
    ETableTypes.RATE,
  );

  const onSubmit = useCallback<TFormikSubmit<IFormRate>>(
    (values, { setSubmitting }) => {
      setTimeout(() => {
        sumbitHandler({
          price: Number(values.price),
          rateTypeId: {
            id: values.rateType,
          },
        });

        setSubmitting(false);
      }, 400);
    },
    [],
  );

  return (
    <main className={cl.container}>
      <Formik
        initialValues={RATE_INITIAL_VALUES}
        validationSchema={RATE_VALIDATION}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={onSubmit}
      >
        <Form className={cl.form}>
          <AdminEdit type={ETableTypes.RATE} formType={ETableFormTypes.ADD} />
          <EditButtonList
            formType={ETableFormTypes.ADD}
            pageType={ETableTypes.RATE}
          />
        </Form>
      </Formik>
    </main>
  );
};

export default AddRate;
