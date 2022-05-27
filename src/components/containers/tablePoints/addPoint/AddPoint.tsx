import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import { updateCityList, updatePointSaveStatus } from '@store/reducers/form';
import { ETableFormTypes, ETableTypes } from '@models/app';
import AdminEdit from '@components/common/adminEdit/AdminEdit';
import EditButtonList from '@components/common/editButtonList/EditButtonList';
import { POINT_VALIDATION } from '@utils/constants/validation';
import cl from './AddPoint.module.scss';

const AddPoint: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  return (
    <main className={cl.container}>
      <Formik
        initialValues={{
          name: '',
          city: '',
          address: '',
        }}
        validationSchema={POINT_VALIDATION}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            postPoint({
              name: values.name,
              cityId: {
                id: values.city,
              },
              address: values.address,
            }).then((data) => {
              const result = (data as { data: unknown }).data;

              dispatch(updatePointSaveStatus(Boolean(result)));
              setTimeout(() => {
                dispatch(updatePointSaveStatus(null));
              }, 4000);
              navigate('/admin/point');
            });

            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className={cl.form}>
          <AdminEdit type={ETableTypes.POINT} formType={ETableFormTypes.ADD} />
          <EditButtonList formType="add" />
        </Form>
      </Formik>
    </main>
  );
};

export default AddPoint;
