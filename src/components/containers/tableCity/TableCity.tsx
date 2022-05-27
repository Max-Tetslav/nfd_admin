import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import { updateCityDeleteStatus } from '@store/reducers/form';
import { INameAndID, IPostResponse, IRateType } from '@models/data';
import { ETableTypes } from '@models/app';
import Spin from '@components/common/spin/Spin';
import AdminPagination from '@components/common/adminPagination/AdminPagination';
import AdminTable from '@components/common/adminTable/AdminTable';
import AdminError from '@components/common/adminError/AdminError';
import { NAME_AND_ID_HEADERS } from '@utils/constants/tables';
import cl from './TableCity.module.scss';

const TableCity: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const {
    data: cityRequest,
    error,
    isLoading,
    isFetching,
  } = nfdApi.useGetCityListQuery({
    page: page - 1,
    limit: 6,
  });
  const [deleteCity] = nfdApi.useDeleteCityMutation();

  const [cities, setCities] = useState<INameAndID[]>([]);
  const [totalCity, setTotal] = useState(0);

  useEffect(() => {
    if (cityRequest?.data) {
      setCities(cityRequest.data);
      setTotal(cityRequest.count);
    }
  }, [cityRequest]);

  useEffect(() => {
    if (cityRequest?.data) {
      setCities(cityRequest.data);
    }
  }, [page]);

  const deleteHandler = useCallback((id?: string) => {
    deleteCity(id).then((data) => {
      const result = (
        data as {
          data: IPostResponse<IRateType>;
        }
      ).data;

      dispatch(updateCityDeleteStatus(Boolean(result)));
    });

    setTimeout(() => dispatch(updateCityDeleteStatus(null)), 4000);
  }, []);

  const editHandler = useCallback((id: string) => {
    navigate(`:${id}`);
  }, []);

  const pagination = useMemo(() => {
    return totalCity > 6 ? (
      <AdminPagination
        setPage={setPage}
        pageProp={page}
        total={totalCity}
        limit={6}
      />
    ) : null;
  }, [totalCity, page]);

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
          data={cities}
          headers={NAME_AND_ID_HEADERS}
          type={ETableTypes.CITY}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
        />
        {pagination}
      </>
    );
  }, [isFetching, cities, error]);

  return (
    <main className={cl.container}>
      {isLoading ? <Spin loading={isLoading} /> : content}
    </main>
  );
};

export default TableCity;
