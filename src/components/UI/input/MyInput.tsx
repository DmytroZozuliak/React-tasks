import React, { FC } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import classes from './MyInput.module.scss';

interface Props {
  register?: UseFormRegisterReturn;
  type?: string;
  name?: string;
  placeholder?: string;
  label?: string;
  error?: FieldError;
  errorMessage?: string;
  style?: React.CSSProperties;
  image?: string | null;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  testid?: string;
}

const MyInput: FC<Props> = (props) => {
  const {
    type = 'text',
    name,
    label,
    error,
    errorMessage,
    register,
    image,
    onChange,
    ...restProps
  } = props;

  const inputId = `${type}-${Math.random()}`;
  const cls = [classes.myInput];
  if (type === 'search') {
    cls.push(classes.search);
  }
  if (type === 'file') {
    cls.push(classes.file);
  }

  if (error) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(' ')}>
      {label && (
        <label htmlFor={inputId} className={classes.label}>
          {label}
        </label>
      )}
      {type === 'file' && image ? <img src={image} alt="avatar" /> : null}
      <input
        type={type}
        name={name}
        id={inputId}
        {...register}
        onChange={onChange}
        {...restProps}
      />
      {error && <span>{error.message || errorMessage}</span>}
    </div>
  );
};

export default MyInput;
