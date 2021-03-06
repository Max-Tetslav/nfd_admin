import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from 'antd';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import { setLogoutData } from '@store/reducers/auth';
import cl from './UserInfoDropdown.module.scss';

interface IUserInfoDropdownProps {
  isOpen: boolean;
}

const UserInfoDropdown: React.FC<IUserInfoDropdownProps> = ({ isOpen }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logout] = nfdApi.useLogoutMutation();

  const logoutHandler = useCallback(() => {
    dispatch(setLogoutData());
    logout('');
    navigate('/');
  }, []);

  const classes = classNames(cl.container, { [cl.opened]: isOpen });

  return (
    <div className={classes}>
      <Button
        className={cl.button}
        onClick={logoutHandler}
        htmlType="button"
        type="primary"
        danger
      >
        Выйти
      </Button>
    </div>
  );
};

export default UserInfoDropdown;
