import React from 'react';
import { ErrorMessage, Field, useField } from 'formik';
import classNames from 'classnames';
import { EAuthInputTypes } from '@models/auth';
import cl from './AuthInput.module.scss';

interface IAuthInput {
  label: string;
  name: string;
  type: string;
}

const AuthInput: React.FC<IAuthInput> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const errorClasses = classNames(cl.error, {
    [cl.errorColor]: meta.error,
  });
  const inputClasses = classNames(cl.input, {
    [cl.errorBorder]: meta.error,
  });

  return (
    <label className={cl.label} htmlFor={field.name}>
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
