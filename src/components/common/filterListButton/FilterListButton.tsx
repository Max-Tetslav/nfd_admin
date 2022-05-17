import React, { useCallback } from 'react';
import classnames from 'classnames';
import filterIcon from '@assets/svg/filter.svg';
import cl from './FilterListButton.module.scss';

interface IAsideMenuButtonProps {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterListButton: React.FC<IAsideMenuButtonProps> = ({
  isActive,
  setIsActive,
}) => {
  const clickHandler = useCallback(() => {
    setIsActive((state) => !state);
  }, []);

  return (
    <button
      type="button"
      aria-label="menu"
      className={classnames(cl.button, { [cl.activeBtn]: isActive })}
      onClick={clickHandler}
    >
      <img className={cl.icon} src={filterIcon} alt="filters" />
    </button>
  );
};

export default FilterListButton;
