import React, { ReactNode, useCallback, useState } from 'react';
import classNames from 'classnames';
import { Pagination } from 'antd';
import useAnimate from '@hooks/useAnimate';
import cl from './AdminPagination.module.scss';

interface IAdminPaginationProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageProp: number;
  total: number;
  limit: number;
}

const AdminPagination: React.FC<IAdminPaginationProps> = ({
  setPage,
  pageProp,
  total,
  limit,
}) => {
  const itemRender = useCallback(
    (
      page: number,
      type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
      element: ReactNode,
    ) => {
      switch (type) {
        case 'prev':
          return (
            <button className={cl.turnButton} type="button">
              «
            </button>
          );
          break;
        case 'page':
          return (
            <button className={cl.pageButton} type="button">
              {page}
            </button>
          );
          break;
        case 'next':
          return (
            <button className={cl.turnButton} type="button">
              »
            </button>
          );
          break;
        case 'jump-next':
          return (
            <button className={cl.jumpButton} type="button">
              ...
            </button>
          );
          break;
        case 'jump-prev':
          return (
            <button className={cl.jumpButton} type="button">
              ...
            </button>
          );
          break;
        default:
          return element;
      }
    },
    [],
  );

  const [animate, setAnimate] = useState(false);

  useAnimate(setAnimate);

  const paginationHandler = useCallback((pageNum: number) => {
    setPage(pageNum);
  }, []);

  const classes = classNames(cl.container, { [cl.loaded]: animate });

  return (
    <div className={classes}>
      <Pagination
        className={cl.pagination}
        showSizeChanger={false}
        total={total}
        defaultPageSize={limit}
        current={pageProp}
        itemRender={itemRender}
        showQuickJumper={false}
        onChange={paginationHandler}
        responsive
      />
    </div>
  );
};

export default AdminPagination;
