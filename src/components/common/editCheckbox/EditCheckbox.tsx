import React, { ChangeEvent, useCallback } from 'react';
import { useField, useFormikContext } from 'formik';
import { IFormCar } from '@models/app';
import Checkbox from '../checkbox/Checkbox';

interface IFilterSelectProps {
  label: string;
  type: string;
  name: string;
  adminEdit?: boolean;
}

const EditCheckbox: React.FC<IFilterSelectProps> = ({ label, ...props }) => {
  const [field, , helpers] = useField(props);
  const { setFieldValue } = useFormikContext<IFormCar>();

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(field.name, e.target.checked);
    helpers.setTouched(true);
  }, []);

  return (
    <Checkbox
      title={label}
      id={field.name}
      status={field.value}
      readOnly={false}
      changeHandler={changeHandler}
      adminEdit={props.adminEdit}
    />
  );
};

export default EditCheckbox;
