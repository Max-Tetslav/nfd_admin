import React, { useCallback, useState } from 'react';
import avatarIcon from '@assets/svg/avatar.svg';
import dropdownIcon from '@assets/svg/dropdown.svg';
import UserInfoDropdown from '../userInfoDropdown/UserInfoDropdown';
import cl from './UserInfoButton.module.scss';

const UserInfoButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = useCallback(() => {
    setIsOpen((state) => !state);
  }, []);

  return (
    <div>
      <button className={cl.container} onClick={clickHandler} type="button">
        <img className={cl.avatar} src={avatarIcon} alt="user" />
        <p className={cl.username}>
          Admin
          <img className={cl.dropdownIcon} src={dropdownIcon} alt="dropdown" />
        </p>
      </button>
      <UserInfoDropdown isOpen={isOpen} />
    </div>
  );
};

export default UserInfoButton;
