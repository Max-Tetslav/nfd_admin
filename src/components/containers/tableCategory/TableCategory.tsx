import React, { FC, useEffect, useMemo, useState } from 'react';
import nfdApi from '@services/api';
import { INameAndID } from '@models/data';
import AdminPagination from '@components/common/adminPagination/AdminPagination';
import Spin from '@components/common/spin/Spin';
import AdminTable from '@components/common/adminTable/AdminTable';
import AdminError from '@components/common/adminError/AdminError';
import { CATEGORY_HEADERS } from '@utils/constants/tables';
import cl from './TableCategory.module.scss';

const TableCategory: FC = () => {
  const [page, setPage] = useState(1);
  const {
    data: categoryRequest,
    error,
    isLoading,
    isFetching,
  } = nfdApi.useGetCategoryListQuery({
    page: page - 1,
    limit: 6,
  });

  const [categories, setCategories] = useState<INameAndID[]>([]);
  const [totalCategory, setTotalCategory] = useState(0);

  useEffect(() => {
    if (categoryRequest?.data) {
      setCategories(categoryRequest.data);
      setTotalCategory(categoryRequest.count);
    }
  }, [categoryRequest]);

  useEffect(() => {
    if (categoryRequest?.data) {
      setCategories(categoryRequest.data);
    }
  }, [page]);

  const pagination = useMemo(() => {
    return totalCategory > 6 ? (
      <AdminPagination
        setPage={setPage}
        pageProp={page}
        total={totalCategory}
        limit={6}
      />
    ) : null;
  }, [totalCategory, page]);

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
          data={categories}
          headers={CATEGORY_HEADERS}
          type="category"
        />
        {pagination}
      </>
    );
  }, [isFetching, categories, error]);

  return (
    <main className={cl.container}>
      {isLoading ? <Spin loading={isLoading} /> : content}
    </main>
  );
};

export default TableCategory;
