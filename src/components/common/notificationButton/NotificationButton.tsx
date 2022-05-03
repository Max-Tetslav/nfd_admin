import React from 'react';
import notificationLogo from '@assets/svg/notifications.svg';
import cl from './NotificationButton.module.scss';

const NotificationButton: React.FC = () => {
  return (
    <button className={cl.container} type="button">
      <div className={cl.logoContainer}>
        <img className={cl.logo} src={notificationLogo} alt="notification" />
        <span className={cl.counter}>0</span>
      </div>
    </button>
  );
};

export default NotificationButton;
