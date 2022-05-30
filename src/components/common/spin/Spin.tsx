import React, { FC } from 'react';
import classNames from 'classnames';
import cl from './Spin.module.scss';

interface ISpinProps {
  loading: boolean;
  select?: boolean;
  submit?: boolean;
}

const Spin: FC<ISpinProps> = ({ loading, select, submit }) => {
  const classes = classNames(
    cl.container,
    { [cl.select]: select },
    { [cl.submit]: submit },
    { [cl.closed]: !loading },
  );

  return <div className={classes} />;
};

export default Spin;
