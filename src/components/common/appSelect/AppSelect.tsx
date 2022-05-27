import React, { FC, useMemo } from 'react';
import classNames from 'classnames';
import { Select } from 'antd';
import { INameAndID } from '@models/data';
import selectIcon from '@assets/svg/select.svg';
import Spin from '../spin/Spin';
import NoData from '../noData/NoData';
import cl from './AppSelect.module.scss';

const { Option } = Select;

interface IAppSelectProps {
  className?: string;
  list: INameAndID[] | null;
  title?: string;
  allowClear?: boolean;
  value: string | undefined;
  changeHandler?: (changedValue: string | undefined) => void;
  clearHandler?: () => void;
  selectHandler?: (selectedValue: string) => void;
}

const AppSelect: FC<IAppSelectProps> = ({
  list,
  title,
  value,
  allowClear,
  className,
  changeHandler,
  clearHandler,
  selectHandler,
}) => {
  const icon = useMemo(() => {
    if (list === null) {
      return <Spin loading select />;
    }
    return <img src={selectIcon} alt="select" />;
  }, [list]);

  const selectValue = useMemo(() => {
    if (list) {
      if (list.length) {
        return value;
      }
      if (list.length === 0) {
        return '';
      }
    } else {
      return 'Подождите, идет загрузка...';
    }
  }, [list, value]);

  const isDisabled = useMemo(() => {
    return list === null;
  }, [list]);

  const classes = classNames(cl.container, className);

  return (
    <Select
      className={classes}
      suffixIcon={icon}
      placeholder={title}
      value={selectValue}
      allowClear={allowClear}
      onChange={changeHandler}
      onClear={clearHandler}
      onSelect={selectHandler}
      disabled={isDisabled}
      notFoundContent={<NoData />}
    >
      {list
        ? list.map((item) => (
            <Option title={item.name} value={item.id} key={item.id}>
              {item.name}
            </Option>
          ))
        : null}
    </Select>
  );
};

export default AppSelect;
