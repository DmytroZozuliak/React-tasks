import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import classes from './MySelect.module.scss';

interface Props {
  name?: string;
  value?: string;
  values: string[];
  options?: string[];
  label?: string;
  register?: UseFormRegisterReturn;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const MySelect: React.FC<Props> = (props) => {
  const { register, label, name, values, value, onChange, options, ...rest } = props;

  return (
    <div className={classes.Select}>
      {label && <label>{label}</label>}
      <select name={name} value={value} {...register} onChange={onChange} {...rest}>
        {values.map((value, index) => {
          return (
            <option key={value} value={value}>
              {options ? options[index] : value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default MySelect;
