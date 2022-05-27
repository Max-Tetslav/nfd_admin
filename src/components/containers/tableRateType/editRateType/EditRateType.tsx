import React, { FC, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import {
  updateRateTypeDeleteStatus,
  updateRateTypeSaveStatus,
} from '@store/reducers/form';
import { ETableFormTypes, ETableTypes } from '@models/app';
import { IPostResponse, IRateType } from '@models/data';
import Spin from '@components/common/spin/Spin';
import AdminEdit from '@components/common/adminEdit/AdminEdit';
import EditButtonList from '@components/common/editButtonList/EditButtonList';
import getIdFromParams from '@utils/helpers/getIdFromParams';
import { RATE_TYPE_VALIDATION } from '@utils/constants/validation';
import cl from './EditRateType.module.scss';

const EditRateType: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id: rateTypeId } = useParams();
  const { data: rateTypeRequest, isFetching } = nfdApi.useGetRateTypeQuery(
    getIdFromParams(rateTypeId as string),
  );

  const [putRateType] = nfdApi.usePutRateTypeMutation();
  const [deleteRateType] = nfdApi.useDeleteRateTypeMutation();

  const deleteHandler = useCallback(() => {
    deleteRateType(getIdFromParams(rateTypeId as string)).then((data) => {
      const result = (
        data as {
          data: IPostResponse<IRateType>;
        }
      ).data;

      dispatch(updateRateTypeDeleteStatus(Boolean(result)));
      setTimeout(() => {
        dispatch(updateRateTypeDeleteStatus(null));
      }, 4000);
      navigate('/admin/tariffType');
    });
  }, []);

  return isFetching ? (
    <Spin loading={isFetching} />
  ) : (
    <main className={cl.container}>
      <Formik
        initialValues={{
          name: rateTypeRequest?.data.name || '',
          duration: rateTypeRequest?.data.unit || '',
        }}
        validationSchema={RATE_TYPE_VALIDATION}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            putRateType({
              id: getIdFromParams(rateTypeId as string),
              data: {
                name: values.name,
                unit: values.duration,
              },
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

export default EditRateType;
