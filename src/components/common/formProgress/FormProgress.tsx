import { ICarFormValues } from '@models/app';
import { popCompleteList, pushCompleteList } from '@store/reducers/form';
import { useAppDispatch, useAppSelector } from '@store/store';
import { Progress } from 'antd';
import { useFormikContext } from 'formik';
import React, { FC, useCallback, useEffect } from 'react';

const FormProgress: FC = () => {
  const { values } = useFormikContext<ICarFormValues>();
  const completeList = useAppSelector((state) => state.form.car.completeList);

  const getProgressKeys = (key: string) => {
    switch (key) {
      case 'model':
        return true;
        break;
      case 'category':
        return true;
        break;
      case 'number':
        return true;
        break;
      case 'minPrice':
        return true;
        break;
      case 'maxPrice':
        return true;
        break;
      case 'tank':
        return true;
        break;
      case 'description':
        return true;
        break;
      case 'colorList':
        return true;
        break;
      case 'imgSrc':
        return true;
        break;
      default:
        return false;
        break;
    }
  };

  const getStatus = useCallback(() => {
    switch (completeList.length) {
      case 1:
        return 12;
        break;
      case 2:
        return 24;
        break;
      case 3:
        return 36;
        break;
      case 4:
        return 48;
        break;
      case 5:
        return 60;
        break;
      case 6:
        return 72;
        break;
      case 7:
        return 84;
        break;
      case 8:
        return 96;
        break;
      case 9:
        return 100;
        break;
      default:
        return 0;
        break;
    }
  }, [completeList]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    Object.entries(values).forEach((key) => {
      if (getProgressKeys(key[0])) {
        if (Array.isArray(key[1])) {
          if (key[1].length && !completeList.includes(key[0])) {
            dispatch(pushCompleteList(key));
          } else if (completeList.includes(key[0])) {
            dispatch(popCompleteList(key));
          }
        } else if (key[1] && !completeList.includes(key[0])) {
          dispatch(pushCompleteList(key));
        } else if (completeList.includes(key[0])) {
          dispatch(popCompleteList(key));
        }
      }
    });
  }, [values]);

  return (
    <Progress
      percent={getStatus()}
      strokeWidth={5}
      strokeColor={getStatus() === 100 ? '#0ec261' : '#007bff'}
      status={getStatus() === 100 ? 'success' : 'active'}
    />
  );
};

export default FormProgress;
