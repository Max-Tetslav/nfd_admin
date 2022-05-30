import React, { FC, useCallback, useEffect } from 'react';
import { useFormikContext } from 'formik';
import { Progress } from 'antd';
import { useAppDispatch, useAppSelector } from '@store/store';
import { popCompleteList, pushCompleteList } from '@store/reducers/form';
import { IFormCar } from '@models/app';

const FormProgress: FC = () => {
  const dispatch = useAppDispatch();
  const completeList = useAppSelector((state) => state.form.car.completeList);
  const { values } = useFormikContext<IFormCar>();

  const getProgressKeys = (key: string) => {
    return key !== 'color';
  };

  const getStatus = useCallback(() => {
    return completeList.length * 12 < 100 ? completeList.length * 12 : 100;
  }, [completeList]);

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
