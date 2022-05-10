import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Pagination } from 'antd';
import cl from './AdminPagination.module.scss';

const AdminPagination: React.FC = () => {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const classes = classNames(cl.container, { [cl.loaded]: animate });

  return (
    <div className={classes}>
      <Pagination
        className={cl.pagination}
        showSizeChanger={false}
        defaultCurrent={1}
        total={200}
        defaultPageSize={6}
        current={1}
        itemRender={itemRender}
        showQuickJumper={false}
        // onChange={paginationHandler}
        responsive
      />
    </div>
  );
};

export default AdminPagination;
