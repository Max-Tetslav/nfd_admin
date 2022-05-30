import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import { updateRateTypeDeleteStatus } from '@store/reducers/form';
import { ETableTypes } from '@models/app';
import { IPostResponse, IRateType } from '@models/data';
import AdminPagination from '@components/common/adminPagination/AdminPagination';
import Spin from '@components/common/spin/Spin';
import AdminTable from '@components/common/adminTable/AdminTable';
import AdminError from '@components/common/adminError/AdminError';
import { RATE_TYPE_HEADERS } from '@utils/constants/tables';
import cl from './TableRateType.module.scss';

const TableRateType: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const {
    data: rateTypeRequest,
    error,
    isFetching,
    isLoading,
  } = nfdApi.useGetRateTypeListQuery({
    page: page - 1,
    limit: 6,
  });
  const [deleteRateType] = nfdApi.useDeleteRateTypeMutation();
  const [rateTypes, setRateTypes] = useState<IRateType[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (rateTypeRequest?.data) {
      setRateTypes(rateTypeRequest.data);
      setTotal(rateTypeRequest.count);

      if (rateTypeRequest.data.length === 0) {
        navigate('/admin/tariffType/');
      }
    }
  }, [rateTypeRequest]);

  useEffect(() => {
    if (rateTypeRequest?.data) {
      setRateTypes(rateTypeRequest.data);
    }
  }, [page]);

  const deleteHandler = useCallback((id?: string) => {
    deleteRateType(id).then((data) => {
      const result = (
        data as {
          data: IPostResponse<IRateType>;
        }
      ).data;

      dispatch(updateRateTypeDeleteStatus(Boolean(result)));
    });

    setTimeout(() => dispatch(updateRateTypeDeleteStatus(null)), 4000);
  }, []);

  const editHandler = useCallback((id: string) => {
    navigate(`:${id}`);
  }, []);

  const pagination = useMemo(() => {
    return total > 6 ? (
      <AdminPagination
        setPage={setPage}
        pageProp={page}
        total={total}
        limit={6}
      />
    ) : null;
  }, [total, page]);

  const content = useMemo(() => {
    if (error) {
      return (
        <AdminError
          code={(error as { originalStatus: number }).originalStatus}
        />
      );
    }

    return isFetching ? (
      <Spin loading={isFetching} />
    ) : (
      <>
        <AdminTable
          data={rateTypes}
          headers={RATE_TYPE_HEADERS}
          type={ETableTypes.RATE_TYPE}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
        />
        {pagination}
      </>
    );
  }, [rateTypes, isFetching, error]);

  return (
    <main className={cl.container}>
      {isLoading ? <Spin loading={isLoading} /> : content}
    </main>
  );
};

export default TableRateType;
