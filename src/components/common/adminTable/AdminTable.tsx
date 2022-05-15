import React, { FC, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Button, Table } from 'antd';
import { ICar, ICategory, INameAndID, IPoint, IRate } from '@models/data';
import { ETableTypes, ITableColumn, ITableHeader } from '@models/app';
import cancelIcon from '@assets/svg/cancel.svg';
import editIcon from '@assets/svg/edit.svg';
import formatPrice from '@utils/helpers/formatPrice';
import { DATA_ERROR_MESSAGE } from '@utils/constants/tables';
import cl from './AdminTable.module.scss';
import useAnimate from '../../../hooks/useAnimate';

interface IAdminTableProps {
  data: unknown[];
  headers: ITableHeader[];
  type: string;
}

const AdminTable: FC<IAdminTableProps> = ({ data, headers, type }) => {
  const [animate, setAnimate] = useState(false);

  useAnimate(setAnimate);

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
      render: () => (
        <div className={cl.buttonBox}>
          <Button
            className={classNames(cl.button, cl.cancelButton)}
            // onClick={cancelHandler}
            icon={
              <img className={cl.buttonIcon} src={cancelIcon} alt="cancel" />
            }
          >
            Отмена
          </Button>
          <Button
            className={classNames(cl.button, cl.editButton)}
            // onClick={editHandler}
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
            name: item.rateTypeId.name,
            duration: item.rateTypeId.unit,
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
  }, []);

  const classes = classNames(
    cl.container,
    { [cl.noFilters]: type !== ETableTypes.ORDER || ETableTypes.CAR },
    { [cl.loaded]: animate },
  );

  return (
    <Table
      className={classes}
      dataSource={dataList}
      columns={colums}
      pagination={false}
    />
  );
};

export default AdminTable;
