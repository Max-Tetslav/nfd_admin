import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import {
  updateCategoryCurrent,
  updateCategoryDeleteStatus,
} from '@store/reducers/form';
import { ETableTypes } from '@models/app';
import { INameAndID, IPostResponse, IRateType } from '@models/data';
import AdminPagination from '@components/common/adminPagination/AdminPagination';
import AdminTable from '@components/common/adminTable/AdminTable';
import AdminError from '@components/common/adminError/AdminError';
import Spin from '@components/common/spin/Spin';
import { CATEGORY_HEADERS } from '@utils/constants/tables';
import cl from './TableCategory.module.scss';

const TableCategory: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState<INameAndID[]>([]);
  const [totalCategory, setTotalCategory] = useState(0);
  const [deleteCategory] = nfdApi.useDeleteCategoryMutation();
  const {
    data: categoryRequest,
    error,
    isLoading,
    isFetching,
  } = nfdApi.useGetCategoryListQuery({
    page: page - 1,
    limit: 6,
  });

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

  const deleteHandler = useCallback((id?: string) => {
    deleteCategory(id).then((data) => {
      const result = (
        data as {
          data: IPostResponse<IRateType>;
        }
      ).data;

      dispatch(updateCategoryDeleteStatus(Boolean(result)));
    });

    setTimeout(() => dispatch(updateCategoryDeleteStatus(null)), 4000);
  }, []);

  const editHandler = useCallback((id: string) => {
    navigate(`:${id}`);
    dispatch(updateCategoryCurrent(id));
  }, []);

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
          type={ETableTypes.CATEGORY}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
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
