import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import { updatePointDeleteStatus } from '@store/reducers/form';
import { IPoint, IPostResponse, IRateType } from '@models/data';
import AdminPagination from '@components/common/adminPagination/AdminPagination';
import Spin from '@components/common/spin/Spin';
import AdminTable from '@components/common/adminTable/AdminTable';
import AdminError from '@components/common/adminError/AdminError';
import { POINT_HEADERS } from '@utils/constants/tables';
import cl from './TablePoints.module.scss';

const TablePoints: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const {
    data: pointRequest,
    error,
    isLoading,
    isFetching,
  } = nfdApi.useGetPointListQuery({
    page: page - 1,
  });
  const [deletePoint] = nfdApi.useDeletePointMutation();

  const [points, setPoints] = useState<IPoint[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (pointRequest?.data) {
      setPoints(pointRequest.data);
      setTotal(pointRequest.count);
    }
  }, [pointRequest]);

  useEffect(() => {
    if (pointRequest?.data) {
      setPoints(pointRequest.data);
    }
  }, [page]);

  const deleteHandler = useCallback((id?: string) => {
    deletePoint(id).then((data) => {
      const result = (
        data as {
          data: IPostResponse<IRateType>;
        }
      ).data;

      dispatch(updatePointDeleteStatus(Boolean(result)));
    });

    setTimeout(() => dispatch(updatePointDeleteStatus(null)), 4000);
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
          data={points}
          headers={POINT_HEADERS}
          type="point"
          deleteHandler={deleteHandler}
          editHandler={editHandler}
        />
        {pagination}
      </>
    );
  }, [isFetching, points, error]);

  return (
    <main className={cl.container}>
      {isLoading ? <Spin loading={isLoading} /> : content}
    </main>
  );
};

export default TablePoints;
