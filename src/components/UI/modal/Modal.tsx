import React, { FC } from 'react';
import classes from './Modal.module.scss';
interface Props {
  active: boolean;
  setActive: () => void;
}

const Modal: FC<Props> = (props) => {
  const { active, setActive, children } = props;
  const cls = [classes.modal];
  if (active) {
    cls.push(classes.active);
  }

  return (
    <div className={cls.join(' ')} onClick={setActive} data-testid="modal-wrapper-test">
      <div className={classes.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
