import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useField, useFormikContext } from 'formik';
import classNames from 'classnames';
import { Input } from 'antd';
import { IFormOrder } from '@models/app';
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
  const { values, setFieldValue } = useFormikContext<IFormOrder>();
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (values.totalTime) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, []);

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const dateTo = new Date(e.target.value).getTime() + values.totalTime;
    setFieldValue('dateTo', dateTo);

    helpers.setValue(new Date(e.target.value).getTime());
  }, []);

  const allowClear = useMemo(() => {
    if (props.readonly || isDisabled) {
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
  }, [props.readonly, isDisabled]);

  const minDate = useMemo(() => getCalendarDateFormat(field.value), []);

  const classes = classNames(cl.container, {
    [cl.disabled]: isDisabled || props.readonly,
  });

  return (
    <label className={classes} htmlFor={field.name}>
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
        readOnly={props.readonly || isDisabled}
        allowClear={allowClear}
        disabled={props.readonly || isDisabled}
      />
      {(isDisabled || props.readonly) && (
        <span className={cl.readonly}>Это поле только для чтения</span>
      )}
    </label>
  );
};

export default EditDatepicker;
