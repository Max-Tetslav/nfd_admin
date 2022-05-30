import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import { updateRateDeleteStatus } from '@store/reducers/form';
import { IPostResponse, IRate, IRateType } from '@models/data';
import { ETableTypes } from '@models/app';
import Spin from '@components/common/spin/Spin';
import AdminTable from '@components/common/adminTable/AdminTable';
import AdminError from '@components/common/adminError/AdminError';
import AdminPagination from '@components/common/adminPagination/AdminPagination';
import { RATE_HEADERS } from '@utils/constants/tables';
import cl from './TableRates.module.scss';

const TableRates: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const {
    data: rateRequest,
    error,
    isFetching,
    isLoading,
  } = nfdApi.useGetRateListQuery({
    page: page - 1,
    limit: 6,
  });
  const [deleteRate] = nfdApi.useDeleteRateMutation();

  const [rates, setRates] = useState<IRate[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (rateRequest?.data) {
      setRates(rateRequest.data);
      setTotal(rateRequest.count);
    }
  }, [rateRequest]);

  useEffect(() => {
    if (rateRequest?.data) {
      setRates(rateRequest.data);
    }
  }, [page]);

  const deleteHandler = useCallback((id?: string) => {
    deleteRate(id).then((data) => {
      const result = (
        data as {
          data: IPostResponse<IRateType>;
        }
      ).data;

      dispatch(updateRateDeleteStatus(Boolean(result)));
    });

    setTimeout(() => dispatch(updateRateDeleteStatus(null)), 4000);
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
          data={rates}
          headers={RATE_HEADERS}
          type={ETableTypes.RATE}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
        />
        {pagination}
      </>
    );
  }, [rates, isFetching, error]);

  return (
    <main className={cl.container}>
      {isLoading ? <Spin loading={isLoading} /> : content}
    </main>
  );
};

export default TableRates;
