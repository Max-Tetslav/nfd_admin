import React, { FC } from 'react';
import { Empty } from 'antd';
import { DATA_ERROR_MESSAGE } from '@utils/constants/tables';
import cl from './NoData.module.scss';

const NoData: FC = () => {
  return (
    <Empty className={cl.container} description={<p>{DATA_ERROR_MESSAGE}</p>} />
  );
};

export default NoData;
