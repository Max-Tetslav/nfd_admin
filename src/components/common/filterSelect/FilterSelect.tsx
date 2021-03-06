import React, { useCallback, useEffect, useState } from 'react';
import { Select } from 'antd';
import { INameAndID } from '@models/data';
import { ETableTypes } from '@models/app';
import { useAppDispatch, useAppSelector } from '@store/store';
import { updateCarFilter, updateOrderFilter } from '@store/reducers/filters';
import selectIcon from '@assets/svg/select.svg';
import cl from './FilterSelect.module.scss';

const { Option } = Select;

interface IFilterSelectProps {
  list: INameAndID[];
  title: string;
  type: string;
}

const FilterSelect: React.FC<IFilterSelectProps> = ({ list, title, type }) => {
  const dispatch = useAppDispatch();
  const stateFilters = useAppSelector((state) => state.filters);
  const [value, setValue] = useState<string | undefined>();

  const changeHandler = useCallback((changedValue: string | undefined) => {
    setValue(changedValue);
  }, []);

  const selectHandler = useCallback((selectedValue: string) => {
    switch (type) {
      case ETableTypes.CITY:
        dispatch(updateOrderFilter({ city: selectedValue }));
        break;
      case ETableTypes.RATE:
        dispatch(updateOrderFilter({ rate: selectedValue }));
        break;
      case ETableTypes.STATUS:
        dispatch(updateOrderFilter({ status: selectedValue }));
        break;
      case ETableTypes.CATEGORY:
        dispatch(updateCarFilter({ category: selectedValue }));
        break;

      // no default
    }
    setValue(selectedValue);
  }, []);

  const clearHandler = useCallback(() => {
    switch (type) {
      case ETableTypes.CITY:
        dispatch(updateOrderFilter({ city: null }));
        break;
      case ETableTypes.RATE:
        dispatch(updateOrderFilter({ rate: null }));
        break;
      case ETableTypes.STATUS:
        dispatch(updateOrderFilter({ status: null }));
        break;
      case ETableTypes.CATEGORY:
        dispatch(updateCarFilter({ category: null }));
        break;

      // no default
    }
  }, []);

  useEffect(() => {
    switch (type) {
      case ETableTypes.CITY:
        if (stateFilters.order.finalList.city) {
          setValue(stateFilters.order.finalList.city);
        }
        break;
      case ETableTypes.RATE:
        if (stateFilters.order.finalList.rate) {
          setValue(stateFilters.order.finalList.rate);
        }
        break;
      case ETableTypes.STATUS:
        if (stateFilters.order.finalList.status) {
          setValue(stateFilters.order.finalList.status);
        }
        break;
      case ETableTypes.CATEGORY:
        if (stateFilters.car.finalList.category) {
          setValue(stateFilters.car.finalList.category);
        }
        break;

      // no default
    }
  }, []);

  useEffect(() => {
    switch (type) {
      case ETableTypes.CITY:
        if (stateFilters.order.finalList.city === null) {
          setValue(undefined);
        }
        break;
      case ETableTypes.RATE:
        if (stateFilters.order.finalList.rate === null) {
          setValue(undefined);
        }
        break;
      case ETableTypes.STATUS:
        if (stateFilters.order.finalList.status === null) {
          setValue(undefined);
        }
        break;
      case ETableTypes.CATEGORY:
        if (stateFilters.car.finalList.category === null) {
          setValue(undefined);
        }
        break;

      // no default
    }
  }, [stateFilters.car.finalList, stateFilters.order.finalList]);

  return (
    <Select
      className={cl.container}
      suffixIcon={<img src={selectIcon} alt="select" />}
      placeholder={title}
      value={value}
      showSearch
      allowClear
      onChange={changeHandler}
      onClear={clearHandler}
      onSelect={selectHandler}
    >
      {list.map((item) => (
        <Option title={item.name} value={item.id} key={item.id}>
          {item.name}
        </Option>
      ))}
    </Select>
  );
};

export default FilterSelect;
