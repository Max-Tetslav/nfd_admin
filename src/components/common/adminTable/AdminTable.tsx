import React, { FC, useMemo } from 'react';
import classNames from 'classnames';
import { Button, Table } from 'antd';
import {
  ICar,
  ICategory,
  INameAndID,
  IPoint,
  IRate,
  IRateType,
} from '@models/data';
import { ETableTypes, ITableColumn, ITableHeader } from '@models/app';
import cancelIcon from '@assets/svg/cancel.svg';
import editIcon from '@assets/svg/edit.svg';
import formatPrice from '@utils/helpers/formatPrice';
import { DATA_ERROR_MESSAGE } from '@utils/constants/tables';
import useModalConfirm from '@hooks/useModalConfirm/useModalConfirm';
import cl from './AdminTable.module.scss';

interface IAdminTableProps {
  data: unknown[];
  headers: ITableHeader[];
  type: string;
  deleteHandler: (id?: string) => void;
  editHandler: (id: string) => void;
}

const AdminTable: FC<IAdminTableProps> = ({
  data,
  headers,
  type,
  deleteHandler,
  editHandler,
}) => {
  const confirmDelete = useModalConfirm();

  const colums: ITableColumn[] = useMemo(() => {
    const result: ITableColumn[] = headers.map((item) => {
      return {
        title: item.name,
        dataIndex: item.key,
        key: item.key,
      };
    });

    result.push({
      title: 'Действия',
      key: 'action',
      render: (record) => (
        <div className={cl.buttonBox}>
          <Button
            className={classNames(cl.button, cl.cancelButton)}
            onClick={() =>
              confirmDelete((record as INameAndID).id, deleteHandler)
            }
            icon={
              <img className={cl.buttonIcon} src={cancelIcon} alt="cancel" />
            }
          >
            Удалить
          </Button>
          <Button
            className={classNames(cl.button, cl.editButton)}
            onClick={() => editHandler((record as INameAndID).id)}
            icon={<img className={cl.buttonIcon} src={editIcon} alt="edit" />}
          >
            Изменить
          </Button>
        </div>
      ),
    });

    return result;
  }, []);

  const dataList = useMemo(() => {
    let rightData;

    switch (type) {
      case ETableTypes.STATUS:
        rightData = (data as INameAndID[]).map((item) => {
          return {
            key: item.id,
            id: item.id,
            name: item.name,
          };
        });
        break;
      case ETableTypes.CITY:
        rightData = (data as INameAndID[]).map((item) => {
          return {
            key: item.id,
            id: item.id,
            name: item.name,
          };
        });
        break;
      case ETableTypes.CATEGORY:
        rightData = (data as ICategory[]).map((item) => {
          return {
            key: item.id,
            id: item.id,
            name: item.name,
            description: item.description,
          };
        });
        break;
      case ETableTypes.RATE:
        rightData = (data as IRate[]).map((item) => {
          return {
            key: item.id,
            id: item.id,
            price: formatPrice(item.price),
            name: item.rateTypeId?.name || DATA_ERROR_MESSAGE,
            duration: item.rateTypeId?.unit || DATA_ERROR_MESSAGE,
          };
        });
        break;
      case ETableTypes.RATE_TYPE:
        rightData = (data as IRateType[]).map((item) => {
          return {
            key: item.id,
            id: item.id,
            name: item.name || DATA_ERROR_MESSAGE,
            duration: item.unit || DATA_ERROR_MESSAGE,
          };
        });
        break;
      case ETableTypes.POINT:
        rightData = (data as IPoint[]).map((item) => {
          return {
            key: item.id,
            id: item.id,
            name: item.name,
            city: item.cityId?.name || DATA_ERROR_MESSAGE,
            address: item.address,
          };
        });
        break;
      case ETableTypes.CAR:
        rightData = (data as ICar[]).map((item) => {
          return {
            key: item.id,
            id: item.id,
            name: item.name,
            description: item.description,
            price: `${formatPrice(item.priceMin)} - ${formatPrice(
              item.priceMax,
            )}`,
            color: item.colors.join(', '),
            number: item?.number || DATA_ERROR_MESSAGE,
          };
        });
        break;

      // no default
    }

    return rightData;
  }, [data]);

  const classes = classNames(cl.container, {
    [cl.noFilters]: type !== ETableTypes.ORDER || ETableTypes.CAR,
  });

  return (
    <Table
      className={classes}
      dataSource={dataList}
      columns={colums}
      pagination={false}
      locale={{ emptyText: 'Нет данных' }}
    />
  );
};

export default AdminTable;
