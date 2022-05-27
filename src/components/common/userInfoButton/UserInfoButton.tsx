import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import avatarIcon from '@assets/svg/avatar.svg';
import dropdownIcon from '@assets/svg/dropdown.svg';
import UserInfoDropdown from '../userInfoDropdown/UserInfoDropdown';
import cl from './UserInfoButton.module.scss';

const UserInfoButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = useCallback(() => {
    setIsOpen((state) => !state);
  }, []);

  const buttonClasses = classNames(cl.button, { [cl.animation]: isOpen });

  return (
    <div className={cl.container}>
      <UserInfoDropdown isOpen={isOpen} />
      <button className={buttonClasses} onClick={clickHandler} type="button">
        <span>
          <img className={cl.avatar} src={avatarIcon} alt="user" />
          <p className={cl.username}>
            Admin
            <img
              className={cl.dropdownIcon}
              src={dropdownIcon}
              alt="dropdown"
            />
          </p>
        </span>
      </button>
    </div>
  );
};

export default UserInfoButton;
