import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import { updateStatusDeleteStatus } from '@store/reducers/form';
import { INameAndID, IPostResponse, IRateType } from '@models/data';
import { ETableTypes } from '@models/app';
import AdminPagination from '@components/common/adminPagination/AdminPagination';
import Spin from '@components/common/spin/Spin';
import AdminTable from '@components/common/adminTable/AdminTable';
import AdminError from '@components/common/adminError/AdminError';
import { NAME_AND_ID_HEADERS } from '@utils/constants/tables';
import cl from './TableOrderStatus.module.scss';

const TableOrderStatus: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const {
    data: statusRequest,
    error,
    isFetching,
    isLoading,
  } = nfdApi.useGetStatusListQuery({
    page: page - 1,
    limit: 6,
  });
  const [deleteStatus] = nfdApi.useDeleteStatusMutation();

  const [statuses, setStatuses] = useState<INameAndID[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (statusRequest?.data) {
      setStatuses(statusRequest.data);
      setTotal(statusRequest.count);
    }
  }, [statusRequest]);

  useEffect(() => {
    if (statusRequest?.data) {
      setStatuses(statusRequest.data);
    }
  }, [page]);

  const deleteHandler = useCallback((id?: string) => {
    deleteStatus(id).then((data) => {
      const result = (
        data as {
          data: IPostResponse<IRateType>;
        }
      ).data;

      dispatch(updateStatusDeleteStatus(Boolean(result)));
    });

    setTimeout(() => dispatch(updateStatusDeleteStatus(null)), 4000);
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
          data={statuses}
          headers={NAME_AND_ID_HEADERS}
          type={ETableTypes.STATUS}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
        />
        {pagination}
      </>
    );
  }, [isFetching, statuses, error]);

  return (
    <main className={cl.container}>
      {isLoading ? <Spin loading={isLoading} /> : content}
    </main>
  );
};

export default TableOrderStatus;
