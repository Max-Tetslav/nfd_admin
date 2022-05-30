import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import nfdApi from '@services/api';
import useFormConfirm from '@hooks/useFormConfirm';
import { useAppDispatch } from '@store/store';
import {
  ETableFormTypes,
  ETableTypes,
  IFormRate,
  TFormikSubmit,
} from '@models/app';
import {
  updateRateDeleteStatus,
  updateRateSaveStatus,
  updateRateTypeList,
} from '@store/reducers/form';
import { IPostResponse, IRateType } from '@models/data';
import Spin from '@components/common/spin/Spin';
import AdminEdit from '@components/common/adminEdit/AdminEdit';
import EditButtonList from '@components/common/editButtonList/EditButtonList';
import getIdFromParams from '@utils/helpers/getIdFromParams';
import { RATE_VALIDATION } from '@utils/constants/validation';
import cl from './EditRate.module.scss';

const EditRate: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id: rateId } = useParams();

  const { data: rateRequest, isLoading } = nfdApi.useGetRateQuery(
    getIdFromParams(rateId as string),
  );
  const { data: rateTypeRequest } = nfdApi.useGetRateTypeListQuery({
    page: 0,
  });
  const [putRate] = nfdApi.usePutRateMutation();
  const [deleteRate] = nfdApi.useDeleteRateMutation();

  useEffect(() => {
    if (rateTypeRequest?.data) {
      const filteredData = rateTypeRequest.data.map((item) => ({
        name: item.name,
        id: item.id,
      }));

      dispatch(updateRateTypeList(filteredData));
    }
  }, [rateTypeRequest]);

  const deleteHandler = useCallback(() => {
    deleteRate(getIdFromParams(rateId as string)).then((data) => {
      const result = (
        data as {
          data: IPostResponse<IRateType>;
        }
      ).data;

      dispatch(updateRateDeleteStatus(Boolean(result)));
      setTimeout(() => {
        dispatch(updateRateDeleteStatus(null));
      }, 4000);
      navigate('/admin/rate');
    });
  }, []);

  const sumbitHandler = useFormConfirm(
    putRate as (data: object) => Promise<unknown>,
    updateRateSaveStatus,
    ETableTypes.RATE,
  );

  const onSubmit = useCallback<TFormikSubmit<IFormRate>>(
    (values, { setSubmitting }) => {
      setTimeout(() => {
        sumbitHandler({
          id: getIdFromParams(rateId as string),
          data: {
            price: Number(values.price),
            rateTypeId: {
              id: values.rateType,
            },
          },
        });

        setSubmitting(false);
      }, 400);
    },
    [rateId],
  );

  const intialValues = useMemo(() => {
    return {
      rateType: rateRequest?.data.rateTypeId?.id || '',
      price: rateRequest?.data.price || 0,
    };
  }, [rateRequest]);

  return isLoading ? (
    <Spin loading={isLoading} />
  ) : (
    <main className={cl.container}>
      <Formik
        initialValues={intialValues}
        validationSchema={RATE_VALIDATION}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={onSubmit}
      >
        <Form className={cl.form}>
          <AdminEdit type={ETableTypes.RATE} formType={ETableFormTypes.EDIT} />
          <EditButtonList
            formType={ETableFormTypes.EDIT}
            pageType={ETableTypes.RATE}
            deleteHandler={deleteHandler}
          />
        </Form>
      </Formik>
    </main>
  );
};

export default EditRate;
