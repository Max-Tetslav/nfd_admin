import React, { FC, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import useFormConfirm from '@hooks/useFormConfirm';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import {
  updateRateTypeDeleteStatus,
  updateRateTypeSaveStatus,
} from '@store/reducers/form';
import {
  ETableFormTypes,
  ETableTypes,
  IFormRateType,
  TFormikSubmit,
} from '@models/app';
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

  const sumbitHandler = useFormConfirm(
    putRateType as (data: object) => Promise<unknown>,
    updateRateTypeSaveStatus,
    ETableTypes.RATE_TYPE,
  );

  const onSubmit = useCallback<TFormikSubmit<IFormRateType>>(
    (values, { setSubmitting }) => {
      setTimeout(() => {
        sumbitHandler({
          id: getIdFromParams(rateTypeId as string),
          data: values,
        });

        setSubmitting(false);
      }, 400);
    },
    [rateTypeId],
  );

  const initialValues = useMemo(() => {
    return {
      name: rateTypeRequest?.data.name || '',
      unit: rateTypeRequest?.data.unit || '',
    };
  }, [rateTypeRequest]);

  return isFetching ? (
    <Spin loading={isFetching} />
  ) : (
    <main className={cl.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={RATE_TYPE_VALIDATION}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={onSubmit}
      >
        <Form className={cl.form}>
          <AdminEdit
            type={ETableTypes.RATE_TYPE}
            formType={ETableFormTypes.EDIT}
          />
          <EditButtonList
            formType={ETableFormTypes.EDIT}
            pageType={ETableTypes.RATE_TYPE}
            deleteHandler={deleteHandler}
          />
        </Form>
      </Formik>
    </main>
  );
};

export default EditRateType;
