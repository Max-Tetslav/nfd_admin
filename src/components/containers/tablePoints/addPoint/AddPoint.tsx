import React, { FC, useCallback, useEffect } from 'react';
import { Form, Formik } from 'formik';
import useFormConfirm from '@hooks/useFormConfirm';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import { updateCityList, updatePointSaveStatus } from '@store/reducers/form';
import {
  ETableFormTypes,
  ETableTypes,
  IFormPoint,
  TFormikSubmit,
} from '@models/app';
import AdminEdit from '@components/common/adminEdit/AdminEdit';
import EditButtonList from '@components/common/editButtonList/EditButtonList';
import { POINT_VALIDATION } from '@utils/constants/validation';
import { POINT_INITIAL_VALUES } from '@utils/constants/tables';
import cl from './AddPoint.module.scss';

const AddPoint: FC = () => {
  const dispatch = useAppDispatch();

  const [postPoint] = nfdApi.usePostPointMutation();
  const { data: cityRequest } = nfdApi.useGetCityListQuery({
    page: 0,
  });

  useEffect(() => {
    if (cityRequest?.data) {
      const filteredData = cityRequest.data.map((item) => ({
        name: item.name,
        id: item.id,
      }));

      dispatch(updateCityList(filteredData));
    }
  }, [cityRequest]);

  const sumbitHandler = useFormConfirm(
    postPoint as (data: object) => Promise<unknown>,
    updatePointSaveStatus,
    ETableTypes.POINT,
  );

  const onSubmit = useCallback<TFormikSubmit<IFormPoint>>(
    (values, { setSubmitting }) => {
      setTimeout(() => {
        sumbitHandler({
          name: values.name,
          address: values.address,
          cityId: {
            id: values.city,
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
        initialValues={POINT_INITIAL_VALUES}
        validationSchema={POINT_VALIDATION}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={onSubmit}
      >
        <Form className={cl.form}>
          <AdminEdit type={ETableTypes.POINT} formType={ETableFormTypes.ADD} />
          <EditButtonList
            formType={ETableFormTypes.ADD}
            pageType={ETableTypes.POINT}
          />
        </Form>
      </Formik>
    </main>
  );
};

export default AddPoint;
