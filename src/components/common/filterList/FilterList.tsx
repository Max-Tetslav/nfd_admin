import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { periodData, testData } from '@utils/constants/filterData';
import { Button } from 'antd';
import FilterListButton from '../filterListButton/FilterListButton';
import FilterSelect from '../filterSelect/FilterSelect';
import cl from './FilterList.module.scss';

const FilterList: React.FC = () => {
  const [isFiltersOpened, setIsFiltersOpened] = useState(false);

  const openedHandler = useCallback(() => {
    setIsFiltersOpened((state) => !state);
  }, []);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const classes = classNames(
    cl.container,
    { [cl.loaded]: animate },
    { [cl.opened]: isFiltersOpened },
  );

  return (
    <>
      <div className={classes}>
        <div className={cl.filterBox}>
          <FilterSelect title="Период" list={periodData} />
          <FilterSelect title="Город" list={testData} />
          <FilterSelect title="Модель" list={testData} />
          <FilterSelect title="Статус" list={testData} />
        </div>
        <div className={cl.buttonBox}>
          <Button
            className={classNames(cl.button, cl.danger)}
            htmlType="button"
            type="primary"
            danger
            // disabled={isSubmitting}
          >
            Отменить
          </Button>
          <Button
            className={cl.button}
            htmlType="button"
            type="primary"
            // disabled={isSubmitting}
          >
            Применить
          </Button>
        </div>
      </div>
      <FilterListButton
        isActive={isFiltersOpened}
        clickHandler={openedHandler}
      />
    </>
  );
};

export default FilterList;
