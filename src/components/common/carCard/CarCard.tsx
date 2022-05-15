import React from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import { ICar } from '@models/data';
import cancelIcon from '@assets/svg/cancel.svg';
import editIcon from '@assets/svg/edit.svg';
import formatPrice from '@utils/helpers/formatPrice';
import { DATA_ERROR_MESSAGE } from '@utils/constants/tables';
import cl from './CarCard.module.scss';

interface ICarCardProps {
  car: ICar;
}

const CarCard: React.FC<ICarCardProps> = ({
  car: {
    name,
    priceMin,
    priceMax,
    number,
    colors,
    description,
    categoryId,
    thumbnail: { path },
  },
}) => {
  return (
    <div className={cl.container}>
      <p className={cl.model}>{name}</p>
      <img className={cl.img} src={path} alt={name} />
      <div className={cl.numberBox}>
        <p className={cl.number}>
          {number
            ? number.replace(/\d{1,}/g, ` $& `).toLocaleUpperCase()
            : DATA_ERROR_MESSAGE}
        </p>
      </div>
      <p className={cl.category}>{categoryId?.name || DATA_ERROR_MESSAGE}</p>
      <p className={cl.colors}>{colors.join(', ')}</p>
      <p className={cl.price}>
        {`${formatPrice(priceMin)} - ${formatPrice(priceMax)}`}
      </p>
      <p className={cl.description}>{description}</p>
      <div className={cl.buttonBox}>
        <Button
          className={classNames(cl.button, cl.cancelButton)}
          // onClick={cancelHandler}
          icon={<img className={cl.buttonIcon} src={cancelIcon} alt="cancel" />}
        >
          Удалить
        </Button>
        <Button
          className={classNames(cl.button, cl.editButton)}
          // onClick={editHandler}
          icon={<img className={cl.buttonIcon} src={editIcon} alt="edit" />}
        >
          Изменить
        </Button>
      </div>
    </div>
  );
};

export default CarCard;
