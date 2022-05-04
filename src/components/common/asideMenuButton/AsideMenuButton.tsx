import React from 'react';
import classnames from 'classnames';
import cl from './AsideMenuButton.module.scss';

interface IAsideMenuButtonProps {
  isActive: boolean;
  clickHandler: () => void;
}

const AsideMenuButton: React.FC<IAsideMenuButtonProps> = ({
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
      <span />
    </button>
  );
};

export default AsideMenuButton;
