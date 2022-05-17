import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { Empty } from 'antd';
import useAnimate from '@hooks/useAnimate';
import { DATA_ERROR_MESSAGE } from '@utils/constants/tables';
import cl from './NoData.module.scss';

const NoData: FC = () => {
  const [animate, setAnimate] = useState(false);

  useAnimate(setAnimate);

  const classes = classNames(cl.container, { [cl.loaded]: animate });

  return (
    <Empty className={classes} description={<p>{DATA_ERROR_MESSAGE}</p>} />
  );
};

export default NoData;
