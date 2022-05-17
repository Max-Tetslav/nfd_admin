import React, { useState } from 'react';
import classNames from 'classnames';
import useAnimate from '@hooks/useAnimate';
import { ICar } from '@models/data';
import CarCard from '@components/common/carCard/CarCard';
import NoData from '@components/common/noData/NoData';
import cl from './CarsList.module.scss';

interface IOrderListProps {
  cars: ICar[];
}

const CarsList: React.FC<IOrderListProps> = ({ cars }) => {
  const [animate, setAnimate] = useState(false);

  useAnimate(setAnimate);

  const classes = classNames(cl.container, { [cl.loaded]: animate });

  return (
    <div className={classes}>
      {cars.length === 0 && <NoData />}
      {cars.length > 0
        ? cars.map((item) => <CarCard car={item} key={item.id} />)
        : null}
    </div>
  );
};

export default CarsList;
