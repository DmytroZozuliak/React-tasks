import React, { FC } from 'react';
import classes from './MyButton.module.scss';

interface Props {
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  disable?: boolean;
  onClick?: () => void;
}

const MyButton: FC<Props> = (props) => {
  const { disable, type = 'button', className, ...restProps } = props;
  const cls = [classes.Button];
  if (className) {
    cls.push(className);
  }
  if (disable) {
    cls.push(classes.disable);
  }

  return (
    <button className={cls.join(' ')} type={type} disabled={disable} {...restProps}>
      {props.children}
    </button>
  );
};

export default MyButton;
