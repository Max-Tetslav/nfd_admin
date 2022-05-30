import React from 'react';
import { ICar } from '@models/data';
import CarCard from '@components/common/carCard/CarCard';
import NoData from '@components/common/noData/NoData';
import cl from './CarsList.module.scss';

interface IOrderListProps {
  cars: ICar[];
  deleteHandler: (id: string) => void;
  editHandler: (id: string) => void;
}

const CarsList: React.FC<IOrderListProps> = ({
  cars,
  deleteHandler,
  editHandler,
}) => {
  return (
    <div className={cl.container}>
      {cars.length > 0 ? (
        cars.map((item) => (
          <CarCard
            car={item}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
            key={item.id}
          />
        ))
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default CarsList;
