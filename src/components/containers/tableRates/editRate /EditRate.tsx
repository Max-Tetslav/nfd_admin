import AdminEdit from '@components/common/adminEdit/AdminEdit';
import EditButtonList from '@components/common/editButtonList/EditButtonList';
import { Form, Formik } from 'formik';
import React, { FC, useCallback, useEffect } from 'react';
import { ETableFormTypes, ETableTypes } from '@models/app';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import getIdFromParams from '@utils/helpers/getIdFromParams';
import { useNavigate, useParams } from 'react-router-dom';
import Spin from '@components/common/spin/Spin';
import {
  updateRateDeleteStatus,
  updateRateSaveStatus,
  updateRateTypeList,
} from '@store/reducers/form';
import { IPostResponse, IRateType } from '@models/data';
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

  return isLoading ? (
    <Spin loading={isLoading} />
  ) : (
    <main className={cl.container}>
      <Formik
        initialValues={{
          rateType: rateRequest?.data.rateTypeId?.id || '',
          price: rateRequest?.data.price || '',
        }}
        validationSchema={RATE_VALIDATION}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            putRate({
              id: getIdFromParams(rateId as string),
              data: {
                price: Number(values.price),
                rateTypeId: {
                  id: values.rateType,
                },
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
          <AdminEdit type={ETableTypes.RATE} formType={ETableFormTypes.EDIT} />
          <EditButtonList
            formType={ETableFormTypes.EDIT}
            deleteHandler={deleteHandler}
          />
        </Form>
      </Formik>
    </main>
  );
};

export default EditRate;
