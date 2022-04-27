import React, { FC, useContext } from 'react';
import { AppContext } from '../../../store/context';
import CardsForm from './cardsForm/CardsForm';
import Form from './form/Form';

const FormPage: FC = () => {
  const { state } = useContext(AppContext);

  return (
    <div className="form-page container">
      <Form />
      <CardsForm cards={state.formPage.personCards} />
    </div>
  );
};

export default FormPage;
