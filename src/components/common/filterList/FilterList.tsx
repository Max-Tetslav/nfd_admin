import React, { FC, useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import { INameAndID } from '@models/data';
import { ETableTypes } from '@models/app';
import { useAppDispatch, useAppSelector } from '@store/store';
import {
  applyCarFilters,
  applyOrderFilters,
  clearCarFilters,
  clearOrderFilters,
} from '@store/reducers/filters';
import FilterListButton from '../filterListButton/FilterListButton';
import FilterSelect from '../filterSelect/FilterSelect';
import cl from './FilterList.module.scss';

interface IFilterListProps {
  type: string;
  categoryList?: INameAndID[];
  cityList?: INameAndID[];
  rateList?: INameAndID[];
  statusList?: INameAndID[];
}

const FilterList: FC<IFilterListProps> = ({
  type,
  categoryList,
  rateList,
  cityList,
  statusList,
}) => {
  const dispatch = useAppDispatch();
  const [isFiltersOpened, setIsFiltersOpened] = useState(false);
  const carFilterStatus = useAppSelector(
    (state) => state.filters.car.filterStatus,
  );
  const orderFilterStatus = useAppSelector(
    (state) => state.filters.order.filterStatus,
  );
  const tempCarList = useAppSelector((state) => state.filters.car.tempList);
  const tempOrderList = useAppSelector((state) => state.filters.order.tempList);

  const filters = useMemo(() => {
    switch (type) {
      case ETableTypes.ORDER:
        return (
          <div className={cl.filterBox}>
            <FilterSelect
              title="Город"
              list={cityList as INameAndID[]}
              type={ETableTypes.CITY}
            />
            <FilterSelect
              title="Тариф"
              list={rateList as INameAndID[]}
              type={ETableTypes.RATE}
            />
            <FilterSelect
              title="Статус заказа"
              list={statusList as INameAndID[]}
              type={ETableTypes.STATUS}
            />
          </div>
        );
        break;
      case ETableTypes.CAR:
        return (
          <div className={cl.filterBox}>
            <FilterSelect
              title="Категория"
              list={categoryList as INameAndID[]}
              type={ETableTypes.CATEGORY}
            />
          </div>
        );
        break;

      // no default
    }
  }, []);

  const applyHandler = useCallback(() => {
    switch (type) {
      case ETableTypes.ORDER:
        dispatch(applyOrderFilters());
        break;
      case ETableTypes.CAR:
        dispatch(applyCarFilters());
        break;

      // no default
    }
  }, []);

  const clearHandler = useCallback(() => {
    switch (type) {
      case ETableTypes.ORDER:
        dispatch(clearOrderFilters());
        break;
      case ETableTypes.CAR:
        dispatch(clearCarFilters());
        break;

      // no default
    }
  }, []);

  const getResetDisableStatus = useMemo(() => {
    switch (type) {
      case ETableTypes.ORDER:
        return !orderFilterStatus;
        break;
      case ETableTypes.CAR:
        return !carFilterStatus;
        break;

      // no default
    }
  }, [carFilterStatus, orderFilterStatus]);

  const getApplyDisableStatus = useMemo(() => {
    switch (type) {
      case ETableTypes.ORDER:
        return (
          !tempOrderList.city && !tempOrderList.rate && !tempOrderList.status
        );
        break;
      case ETableTypes.CAR:
        return !tempCarList.category;
        break;

      // no default
    }
  }, [tempCarList, tempOrderList]);

  const classes = classNames(cl.container, { [cl.opened]: isFiltersOpened });

  return (
    <>
      <div className={classes}>
        {filters}
        <div className={cl.buttonBox}>
          <Button
            className={classNames(cl.button, cl.danger)}
            htmlType="button"
            type="primary"
            danger
            onClick={clearHandler}
            disabled={getResetDisableStatus}
          >
            Отменить
          </Button>
          <Button
            className={cl.button}
            htmlType="button"
            type="primary"
            onClick={applyHandler}
            disabled={getApplyDisableStatus}
          >
            Применить
          </Button>
        </div>
      </div>
      <FilterListButton
        isActive={isFiltersOpened}
        setIsActive={setIsFiltersOpened}
      />
    </>
  );
};

export default FilterList;
