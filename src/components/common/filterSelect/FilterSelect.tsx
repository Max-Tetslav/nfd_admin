import React from 'react';
import { Select } from 'antd';
import selectIcon from '@assets/svg/select.svg';
import getRandomString from '@utils/helpers/getRandomString';
import cl from './FilterSelect.module.scss';

const { Option } = Select;

interface IFilterSelectProps {
  list: string[];
  title: string;
}

const FilterSelect: React.FC<IFilterSelectProps> = ({ list, title }) => {
  return (
    <Select
      className={cl.container}
      defaultValue={title}
      suffixIcon={<img src={selectIcon} alt="select" />}
    >
      <Option value={title} disabled>
        {title}
      </Option>
      {list.map((item) => (
        <Option value={item} key={getRandomString(4) + item}>
          {item}
        </Option>
      ))}
    </Select>
  );
};

export default FilterSelect;
