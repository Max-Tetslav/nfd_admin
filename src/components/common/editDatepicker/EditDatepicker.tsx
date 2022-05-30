import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useField, useFormikContext } from 'formik';
import classNames from 'classnames';
import moment, { Moment } from 'moment';
import { DatePicker } from 'antd';
import { DatePickerProps, RangePickerProps } from 'antd/lib/date-picker';
import { IFormOrder } from '@models/app';
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

  const changeHandler: DatePickerProps['onChange'] = useCallback(
    (date: Moment) => {
      const dateTo = date.valueOf() + values.totalTime;
      setFieldValue('dateTo', dateTo);

      helpers.setValue(date.valueOf());
    },
    [],
  ) as DatePickerProps['onChange'];

  const classes = classNames(cl.container, {
    [cl.disabled]: isDisabled || props.readonly,
  });

  const dateFormat = useMemo(() => ['DD:MM:YYYY, h:mm'], []);

  const disabledDate: RangePickerProps['disabledDate'] = useCallback(
    (current) => {
      return current && current < moment(field.value);
    },
    [],
  );

  return (
    <label className={classes} htmlFor={field.name}>
      <span className={cl.title}>{label}</span>
      <DatePicker
        value={moment(field.value)}
        bordered={false}
        onChange={changeHandler}
        className={cl.input}
        placeholder=""
        suffixIcon={null}
        id={field.name}
        name={field.name}
        allowClear={false}
        disabled={props.readonly || isDisabled}
        showTime
        showSecond={false}
        format={dateFormat}
        defaultValue={moment(field.value)}
        inputReadOnly={props.readonly || isDisabled}
        disabledDate={disabledDate}
      />
      {(isDisabled || props.readonly) && (
        <span className={cl.readonly}>Это поле только для чтения</span>
      )}
    </label>
  );
};

export default EditDatepicker;
