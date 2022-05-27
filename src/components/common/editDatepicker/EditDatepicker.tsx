import React, { ChangeEvent, useCallback, useMemo } from 'react';
import { useField, useFormikContext } from 'formik';
import classNames from 'classnames';
import { Input } from 'antd';
import { IOrderFormValues } from '@models/app';
import getCalendarDateFormat from '@utils/helpers/getCalendarDateFormat';
import clearIcon from '@assets/svg/clearDatepicker.svg';
import cl from './EditDatepicker.module.scss';

interface IFilterSelectProps {
  placeholder?: string;
  label: string;
  type: string;
  name: string;
  readonly?: boolean;
}

const EditDatepicker: React.FC<IFilterSelectProps> = ({
  placeholder,
  label,
  ...props
}) => {
  const [field, , helpers] = useField(props);
  const { values, setFieldValue } = useFormikContext<IOrderFormValues>();

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const dateTo = new Date(e.target.value).getTime() + values.totalTime;
    setFieldValue('dateTo', dateTo);

    helpers.setValue(new Date(e.target.value).getTime());
  }, []);

  const allowClear = useMemo(() => {
    if (props.readonly) {
      return false;
    }
    return {
      clearIcon: (
        <img
          src={clearIcon}
          className={classNames(cl.clearIcon, {
            [cl.clearIconVisible]: field.value,
          })}
          alt="clear-input"
        />
      ),
    };
  }, [props.readonly]);

  const minDate = useMemo(() => getCalendarDateFormat(field.value), []);

  return (
    <label className={cl.container} htmlFor={field.name}>
      <span className={cl.title}>{label}</span>
      <Input
        value={getCalendarDateFormat(field.value)}
        min={minDate}
        type={props.type}
        bordered={false}
        onChange={changeHandler}
        className={cl.input}
        placeholder={placeholder}
        autoComplete="off"
        id={field.name}
        name={field.name}
        readOnly={props.readonly}
        allowClear={allowClear}
        disabled={props.readonly}
      />
    </label>
  );
};

export default EditDatepicker;
