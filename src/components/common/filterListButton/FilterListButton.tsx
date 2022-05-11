import React from 'react';
import classnames from 'classnames';
import filterIcon from '@assets/svg/filter.svg';
import cl from './FilterListButton.module.scss';

interface IAsideMenuButtonProps {
  isActive: boolean;
  clickHandler: () => void;
}

const FilterListButton: React.FC<IAsideMenuButtonProps> = ({
  isActive,
  clickHandler,
}) => {
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
