import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, notification } from 'antd';
import Link from 'antd/lib/typography/Link';
import nfdApi from '@services/api';
import { useAppDispatch } from '@store/store';
import { IRefreshResponse, setLoginData } from '@store/reducers/auth';
import { EAuthInputTypes } from '@models/auth';
import AuthInput from '@components/common/authInput/AuthInput';
import { errorTitle, errorDescription } from '@utils/constants/auth';
import cl from './AuthForm.module.scss';

const AuthForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, loginResp] = nfdApi.useLoginMutation();

  const openNotificationWithIcon = (mess: string, desc: string) => {
    notification.error({
      message: mess,
      description: desc,
    });
  };

  useEffect(() => {
    if (loginResp.error) {
      openNotificationWithIcon(errorTitle, errorDescription);
    }
  }, [loginResp]);

  useEffect(() => {
    if (loginResp.data) {
      localStorage.setItem('accessToken', loginResp.data.access_token);
      localStorage.setItem('refreshToken', loginResp.data.refresh_token);
      localStorage.setItem(
        'tokenExpires',
        loginResp.data.expires_in.toString(),
      );
      dispatch(setLoginData(loginResp as IRefreshResponse));
      navigate('/admin/order');
    }
  }, [loginResp]);

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={Yup.object({
        username: Yup.string().required('Обязательное поле!'),
        password: Yup.string().required('Обязательное поле!'),
      })}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          login(values);

          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={cl.form}>
          <h1 className={cl.title}>Вход</h1>
          <AuthInput
            label="Почта"
            name={EAuthInputTypes.USERNAME}
            type="text"
          />
          <AuthInput
            label="Пароль"
            name={EAuthInputTypes.PASSWORD}
            type={EAuthInputTypes.PASSWORD}
          />
          <div className={cl.btnsContainer}>
            <Link className={cl.link} href="/">
              Запросить доступ
            </Link>
            <Button
              className={cl.button}
              htmlType="submit"
              disabled={isSubmitting}
              type="primary"
            >
              Войти
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
