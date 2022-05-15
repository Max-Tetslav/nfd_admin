import React, { FC } from 'react';
import classNames from 'classnames';
import cl from './Spin.module.scss';

interface ISpinProps {
  loading: boolean;
}

const Spin: FC<ISpinProps> = ({ loading }) => {
  const classes = classNames(cl.container, { [cl.closed]: !loading });

  return <div className={classes} />;
};

export default Spin;
