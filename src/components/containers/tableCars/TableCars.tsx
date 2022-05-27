import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import nfdApi from '@services/api';
import useModalConfirm from '@hooks/useModalConfirm/useModalConfirm';
import { useAppDispatch, useAppSelector } from '@store/store';
import { updataCarAllFilters } from '@store/reducers/filters';
import { updateCarCurrent, updateCarDeleteStatus } from '@store/reducers/form';
import { ICar, IPostResponse, IRateType } from '@models/data';
import AdminPagination from '@components/common/adminPagination/AdminPagination';
import FilterList from '@components/common/filterList/FilterList';
import AdminError from '@components/common/adminError/AdminError';
import Spin from '@components/common/spin/Spin';
import CarsList from '../carsList/CarsList';
import cl from './TableCars.module.scss';

const TableCars: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const stateFilters = useAppSelector((state) => state.filters.car);
  const [page, setPage] = useState(1);
  const [cars, setCars] = useState<ICar[]>([]);
  const [totalCars, setTotalCars] = useState(0);
  const {
    refetch,
    data: carRequest,
    error,
    isFetching,
    isLoading,
  } = nfdApi.useGetCarListQuery({
    page: page - 1,
    limit: 5,
    category: stateFilters.finalList.category,
  });
  const { data: categoryRequest } = nfdApi.useGetCategoryListQuery({
    page: 0,
  });

  useEffect(() => {
    if (stateFilters.filterStatus === true) {
      refetch();
      setPage(1);
    }
  }, [stateFilters.filterStatus]);

  useEffect(() => {
    if (categoryRequest?.data) {
      const filteredData = categoryRequest.data.map((item) => ({
        name: item.name,
        id: item.id,
      }));

      dispatch(updataCarAllFilters(filteredData));
    }
  }, [categoryRequest]);

  useEffect(() => {
    if (carRequest?.data) {
      setCars(carRequest.data);
      setTotalCars(carRequest.count);
    }
  }, [carRequest]);

  useEffect(() => {
    if (carRequest?.data) {
      setCars(carRequest.data);
    }
  }, [page, stateFilters.finalList]);

  const [deleteCar] = nfdApi.useDeleteCarMutation();
  const confirmDelete = useModalConfirm();

  const onDelete = useCallback((id?: string) => {
    deleteCar(id).then((data) => {
      const result = (
        data as {
          data: IPostResponse<IRateType>;
        }
      ).data;

      dispatch(updateCarDeleteStatus(Boolean(result)));
    });

    setTimeout(() => dispatch(updateCarDeleteStatus(null)), 4000);
  }, []);

  const deleteHandler = useCallback((id: string) => {
    confirmDelete(id, onDelete);
  }, []);

  const editHandler = useCallback((id: string) => {
    navigate(`:${id}`);
    dispatch(updateCarCurrent(id));
  }, []);

  const pagination = useMemo(() => {
    return totalCars > 5 ? (
      <AdminPagination
        setPage={setPage}
        pageProp={page}
        total={totalCars}
        limit={5}
      />
    ) : null;
  }, [totalCars, page]);

  const content = useMemo(() => {
    if (error) {
      return (
        <AdminError
          code={(error as { originalStatus: number }).originalStatus}
        />
      );
    }

    return (
      <>
        <FilterList type="car" categoryList={stateFilters.all.category} />
        {isFetching ? (
          <Spin loading={isFetching} />
        ) : (
          <>
            <CarsList
              cars={cars}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
            />
            {pagination}
          </>
        )}
      </>
    );
  }, [isFetching, error, cars]);

  return (
    <main className={cl.container}>
      {isLoading ? <Spin loading={isLoading} /> : content}
    </main>
  );
};

export default TableCars;
