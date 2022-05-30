import React, { FC, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormikContext } from 'formik';
import classNames from 'classnames';
import { Button } from 'antd';
import useModalConfirm from '@hooks/useModalConfirm/useModalConfirm';
import Spin from '../spin/Spin';
import cl from './EditButtonList.module.scss';

interface IEditButtonList {
  formType: string;
  pageType: string;
  deleteHandler?: (id?: string) => void;
}

const EditButtonList: FC<IEditButtonList> = ({
  formType,
  deleteHandler,
  pageType,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSubmitting } = useFormikContext();
  const confirmDelete = useModalConfirm();

  const onDelete = useCallback(() => {
    confirmDelete(null, deleteHandler as () => void);
  }, []);

  const cancelHandler = useCallback(() => {
    if (location.pathname.includes(pageType)) {
      navigate(`/admin/${pageType}`);
    }
  }, [pageType]);

  return (
    <div className={cl.container}>
      <div className={cl.leftButtons}>
        <Button className={cl.button} htmlType="submit" type="primary">
          {isSubmitting ? <Spin loading={isSubmitting} submit /> : 'Сохранить'}
        </Button>
        <Button
          className={classNames(cl.button, cl.neutral)}
          htmlType="button"
          type="primary"
          onClick={cancelHandler}
        >
          Отменить
        </Button>
      </div>
      <Button
        className={classNames(cl.button, cl.danger)}
        htmlType={formType === 'edit' ? 'button' : 'reset'}
        type="primary"
        danger
        onClick={formType === 'edit' ? onDelete : undefined}
      >
        {formType === 'edit' ? 'Удалить' : 'Сбросить'}
      </Button>
    </div>
  );
};

export default EditButtonList;
