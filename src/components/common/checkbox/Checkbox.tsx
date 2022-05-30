import React, { ChangeEventHandler } from 'react';
import classNames from 'classnames';
import cl from './Checkbox.module.scss';

interface ICheckboxProps {
  title: string;
  id: string;
  status: boolean;
  readOnly: boolean;
  changeHandler?: ChangeEventHandler<HTMLInputElement>;
  adminEdit?: boolean;
}

const Checkbox: React.FC<ICheckboxProps> = ({
  title,
  id,
  status,
  readOnly,
  changeHandler,
  adminEdit,
}) => {
  const inputClasses = classNames(cl.input, { [cl.editInput]: adminEdit });
  const labelClasses = classNames(
    cl.label,
    { [cl.editLabel]: adminEdit },
    { [cl.selected]: status },
  );

  return (
    <label className={labelClasses} htmlFor={id}>
      {title}
      <input
        className={inputClasses}
        id={id}
        type="checkbox"
        checked={status}
        readOnly={readOnly}
        onChange={changeHandler}
      />
      <span className={cl.checkmark} />
    </label>
  );
};

export default Checkbox;
