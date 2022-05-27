import React, { useCallback, useEffect } from 'react';
import { Field, useField, useFormikContext } from 'formik';
import classNames from 'classnames';
import { Button, Checkbox } from 'antd';
import { ICarFormValues } from '@models/app';
import plusIcon from '@assets/svg/plus.svg';
import cl from './ColorListInput.module.scss';

interface IAuthInput {
  label: string;
  adminPage?: boolean;
  name: string;
  type: string;
  as?: string;
  labelClass?: string;
  inputClass?: string;
  list: Array<string>;
  checkedList: Array<string>;
  changeHandler?: (e: EventListenerOrEventListenerObject) => void;
}

const ColorListInput: React.FC<IAuthInput> = ({
  label,
  labelClass,
  inputClass,
  adminPage,
  list,
  checkedList,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const { values, setFieldValue, setFieldError, errors } =
    useFormikContext<ICarFormValues>();

  const errorClasses = classNames(cl.error, {
    [cl.errorColor]: meta.error,
    [cl.editFormError]: adminPage,
  });
  const labelClasses = classNames(cl.label, labelClass, {
    [cl.number]: props.type === 'number',
  });
  const inputClasses = classNames(cl.input, inputClass, {
    [cl.errorBorder]: (errors as { colorList: string }).colorList,
    [cl.textarea]: props.as === 'textarea',
  });

  const clickHandler = useCallback(() => {
    if (field.value && !values.colorList.includes(field.value as never)) {
      setFieldValue('colorList', [...values.colorList, field.value as string]);
      helpers.setValue('');
    }
  }, [field.value, values.colorList, errors]);

  const changeHandler = useCallback(
    (colorList: unknown[]) => {
      setFieldValue('colorList', colorList);
    },
    [values.colorList],
  );

  useEffect(() => {
    if (values.colorList.length) {
      setFieldError('colorList', undefined);
    }
    if (values.colorList.length === 0 && meta.touched) {
      setFieldError('colorList', 'Добавьте минимум один цвет');
    }
  }, [values.colorList]);

  return (
    <label className={labelClasses} htmlFor={field.name}>
      {label}
      <div className={cl.inputBox}>
        <Field {...field} {...props} className={inputClasses} />
        <Button className={cl.button} onClick={clickHandler}>
          <img className={cl.buttonImage} src={plusIcon} alt="plus" />
        </Button>
        {errors.colorList && (
          <span className={errorClasses}>{errors.colorList}</span>
        )}
      </div>
      <Checkbox.Group
        className={cl.checkboxGroup}
        options={values.colorList}
        value={values.colorList}
        onChange={changeHandler}
      />
    </label>
  );
};

export default ColorListInput;
