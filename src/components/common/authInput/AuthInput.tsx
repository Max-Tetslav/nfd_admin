import React from 'react';
import { ErrorMessage, Field, useField } from 'formik';
import classNames from 'classnames';
import { EAuthInputTypes } from '@models/auth';
import cl from './AuthInput.module.scss';

interface IAuthInput {
  label: string;
  adminPage?: boolean;
  min?: number;
  max?: number;
  name: string;
  type: string;
  as?: string;
  labelClass?: string;
  inputClass?: string;
}

const AuthInput: React.FC<IAuthInput> = ({
  label,
  labelClass,
  inputClass,
  adminPage,
  ...props
}) => {
  const [field, meta] = useField(props);

  const errorClasses = classNames(cl.error, {
    [cl.errorColor]: meta.error,
    [cl.editFormError]: adminPage,
  });
  const labelClasses = classNames(cl.label, labelClass, {
    [cl.number]: props.type === 'number',
  });
  const inputClasses = classNames(cl.input, inputClass, {
    [cl.errorBorder]: meta.error,
    [cl.textarea]: props.as === 'textarea',
  });

  return (
    <label className={labelClasses} htmlFor={field.name}>
      {label}
      <Field
        {...field}
        {...props}
        className={inputClasses}
        autoComplete={
          props.type === EAuthInputTypes.PASSWORD
            ? 'current-password'
            : 'username'
        }
      />
      <ErrorMessage name={field.name}>
        {(msg) => <span className={errorClasses}>{msg}</span>}
      </ErrorMessage>
    </label>
  );
};

export default AuthInput;
