import { useCallback, useMemo } from 'react';
import { Modal } from 'antd';
import classNames from 'classnames';
import useGetItemName from '@hooks/useGetItemName';
import cl from './ModalConfirm.module.scss';

const { confirm } = Modal;

const useModalConfirm = (orderStatusAction?: 'complete' | 'cancel') => {
  const itemName = useGetItemName();

  const titleText = useMemo(() => {
    if (orderStatusAction === 'complete') {
      return 'Вы уверены что хотите обновить статус заказа на "Завершенные"?';
    }
    if (orderStatusAction === 'cancel') {
      return 'Вы уверены что хотите обновить статус заказа на "Отмененные"?';
    }
    return `Вы уверены что хотите удалить ${itemName}?`;
  }, [itemName]);

  const contentText = !orderStatusAction
    ? 'После удаления вы будете перенаправлены на страницу списка'
    : undefined;

  const showDeleteConfirm = useCallback(
    (id: string | null, actionHandler: (id?: string) => void) => {
      confirm({
        title: titleText,
        content: contentText,
        okText: 'Да',
        okType: 'danger',
        cancelText: 'Нет',
        centered: true,
        className: cl.modal,
        icon: null,
        cancelButtonProps: {
          type: 'primary',
          className: classNames(cl.button, cl.neutral),
        },
        okButtonProps: {
          type: 'primary',
          danger: !orderStatusAction,
          className: classNames(cl.button, { [cl.danger]: !orderStatusAction }),
        },
        onOk() {
          if (id) {
            actionHandler(id);
          } else {
            actionHandler();
          }
        },
      });
    },
    [],
  );

  return showDeleteConfirm;
};

export default useModalConfirm;
