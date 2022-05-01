import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import { setLogoutData } from '@store/reducers/auth';
import cl from './OrdersContent.module.scss';

const OrdersContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logout] = nfdApi.useLogoutMutation();
  // const location = useLocation();
  // const [refresh, refreshResp] = nfdApi.useRefreshMutation();
  // const refreshToken = localStorage.getItem('refreshToken');

  // useEffect(() => {
  //   console.log(refreshToken);

  // }, [refreshToken]);

  // useEffect(() => {
  //   let timerId: NodeJS.Timeout;

  //   if (location.pathname.includes('admin')) {
  //     const delay = Number(localStorage.getItem('tokenExpires'));
  //     // const token = document.cookie = `refresh=${}`;

  //     timerId = setTimeout(function updateAuth() {
  //       refresh(token);

  //       timerId = setTimeout(updateAuth, 10000);
  //     }, 10000);

  //     return () => clearTimeout(timerId);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (refreshResp.data?.access_token) {
  //     console.log(refreshResp.data.refresh_token);
  //     console.log('работает');

  //     localStorage.setItem('refreshToken', refreshResp.data.refresh_token);
  //     localStorage.setItem('accessToken', refreshResp.data.access_token);
  //   }
  // }, [refreshResp]);

  const logoutHandler = useCallback(() => {
    dispatch(setLogoutData());
    logout('');
    navigate('/');
  }, []);

  return (
    <main className={cl.container}>
      <h1>заказы</h1>
      <button onClick={logoutHandler} type="button">
        выйти
      </button>
    </main>
  );
};

export default OrdersContent;
