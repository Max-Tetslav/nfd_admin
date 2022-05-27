import React, { useCallback } from 'react';
import { ErrorMessage, useField } from 'formik';
import classNames from 'classnames';
import { INameAndID } from '@models/data';
import AppSelect from '../appSelect/AppSelect';
import cl from './EditSelect.module.scss';

interface IFilterSelectProps {
  list: INameAndID[] | null;
  placeholder?: string;
  label: string;
  type: string;
  name: string;
}

const EditSelect: React.FC<IFilterSelectProps> = ({
  list,
  placeholder,
  label,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);

  const selectHandler = useCallback((selectedValue: string) => {
    helpers.setValue(selectedValue);
    helpers.setTouched(true);
  }, []);

  const classes = classNames({ [cl.errorBorder]: meta.error });

  return (
    <label className={cl.label} htmlFor={field.name}>
      {label}
      <AppSelect
        className={classes}
        list={list}
        title={placeholder}
        value={field.value}
        selectHandler={selectHandler}
      />
      <ErrorMessage name={field.name}>
        {() => (
          <span
            className={classNames(cl.error, cl.errorColor, cl.adminPageError)}
          >
            {meta.error}
          </span>
        )}
      </ErrorMessage>
    </label>
  );
};

export default EditSelect;
