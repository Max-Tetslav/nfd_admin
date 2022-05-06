import React from 'react';
import NotificationButton from '@components/common/notificationButton/NotificationButton';
import UserInfoButton from '@components/common/userInfoButton/UserInfoButton';
import cl from './UserBox.module.scss';

const UserBox: React.FC = () => {
  return (
    <div className={cl.container}>
      <NotificationButton />
      <UserInfoButton />
    </div>
  );
};

export default UserBox;
