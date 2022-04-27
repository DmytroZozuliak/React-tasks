import React, { FC } from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import './ToggleCheckbox.scss';

interface Props {
  register?: UseFormRegisterReturn;
  name?: string;
  label?: string;
  error?: FieldError;
  errorMessage?: string;
  style?: React.CSSProperties;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  testid?: string;
}

const ToggleCheckbox: FC<Props> = (props) => {
  const { name = 'checkbox', register, errorMessage, onChange, label, error, ...restProps } = props;
  const inputId = `${name}-${Math.random()}`;

  return (
    <div className="toggle-switch-wrapper">
      <div className="toggle-switch small-switch">
        <input
          className="toggle-switch-checkbox"
          name={name}
          type="checkbox"
          id={inputId}
          {...register}
          // onChange={onChange}
          {...restProps}
        />
        <label className="toggle-switch-label" htmlFor={inputId}>
          <span className="toggle-switch-inner" data-yes="yes" data-no="no" />
          <span className="toggle-switch-switch" />
        </label>
      </div>
      {label && <label htmlFor={inputId}>{label}</label>}
      {error && <span>{error.message || errorMessage}</span>}
    </div>
  );
};

export default ToggleCheckbox;
