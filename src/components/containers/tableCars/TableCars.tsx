import React, { FC, useEffect, useMemo, useState } from 'react';
import nfdApi from '@services/api';
import { ICar, INameAndID } from '@models/data';
import { useAppSelector } from '@store/store';
import AdminPagination from '@components/common/adminPagination/AdminPagination';
import FilterList from '@components/common/filterList/FilterList';
import Spin from '@components/common/spin/Spin';
import AdminError from '@components/common/adminError/AdminError';
import CarsList from '../carsList/CarsList';
import cl from './TableCars.module.scss';

const TableCars: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [page, setPage] = useState(1);

  const stateFilters = useAppSelector((state) => state.filters.car);

  const {
    refetch,
    data: carRequest,
    error,
  } = nfdApi.useGetCarListQuery({
    page: page - 1,
    category: stateFilters.finalList.category,
  });
  const { data: categoryRequest } = nfdApi.useGetCategoryListQuery({
    page: page - 1,
  });

  const [cars, setCars] = useState<ICar[]>([]);
  const [categories, setCategories] = useState<INameAndID[]>([]);
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

      setCategories(filteredData);
    }
  }, [categoryRequest]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (carRequest?.data) {
      timer = setTimeout(() => {
        setIsLoading(false);
        setIsPageLoading(false);
      }, 2000);

      setCars(carRequest.data);
      setTotalCars(carRequest.count);
    } else if (error) {
      setIsLoading(false);
      setIsPageLoading(false);
    }

    return () => clearTimeout(timer);
  }, [carRequest]);

  // Переключении страниц/фильтров

  useEffect(() => {
    setIsPageLoading(true);

    let timer: NodeJS.Timeout;

    if (carRequest?.data) {
      timer = setTimeout(() => {
        setIsPageLoading(false);
      }, 2000);

      setCars(carRequest.data);
    }

    return () => clearTimeout(timer);
  }, [page, stateFilters.finalList]);

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
        <FilterList type="car" categoryList={categories} />
        {isPageLoading ? (
          <Spin loading={isPageLoading} />
        ) : (
          <>
            <CarsList cars={cars} />
            {pagination}
          </>
        )}
      </>
    );
  }, [isPageLoading, totalCars, error]);

  return (
    <main className={cl.container}>
      {isLoading ? <Spin loading={isLoading} /> : content}
    </main>
  );
};

export default TableCars;
