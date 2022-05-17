import React, { FC, useEffect, useMemo, useState } from 'react';
import nfdApi from '@services/api';
import { ICar } from '@models/data';
import { useAppDispatch, useAppSelector } from '@store/store';
import { updataCarAllFilters } from '@store/reducers/filters';
import AdminPagination from '@components/common/adminPagination/AdminPagination';
import FilterList from '@components/common/filterList/FilterList';
import Spin from '@components/common/spin/Spin';
import AdminError from '@components/common/adminError/AdminError';
import CarsList from '../carsList/CarsList';
import cl from './TableCars.module.scss';

const TableCars: FC = () => {
  const dispatch = useAppDispatch();
  const stateFilters = useAppSelector((state) => state.filters.car);

  const [page, setPage] = useState(1);
  const {
    refetch,
    data: carRequest,
    error,
    isFetching,
    isLoading,
  } = nfdApi.useGetCarListQuery({
    page: page - 1,
    category: stateFilters.finalList.category,
  });
  const { data: categoryRequest } = nfdApi.useGetCategoryListQuery({
    page: 0,
  });

  const [cars, setCars] = useState<ICar[]>([]);
  const [totalCars, setTotalCars] = useState(0);

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
  }, [isFetching, page, stateFilters.finalList]);

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
            <CarsList cars={cars} />
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
