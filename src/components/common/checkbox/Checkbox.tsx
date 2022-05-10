import React, { useState } from 'react';
import classNames from 'classnames';
import cl from './Checkbox.module.scss';

interface ICheckboxProps {
  title: string;
  id: string;
  status: boolean;
}

const Checkbox: React.FC<ICheckboxProps> = ({ title, id, status }) => {
  const [isChecked] = useState(status);

  return (
    <label
      className={classNames(cl.label, { [cl.selected]: isChecked })}
      htmlFor={id}
    >
      {title}
      <input
        className={cl.input}
        id={id}
        type="checkbox"
        checked={isChecked}
        readOnly
      />
      <span className={cl.checkmark} />
    </label>
  );
};

export default Checkbox;
