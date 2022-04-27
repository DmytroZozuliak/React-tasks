import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import MyButton from '../../../UI/button/MyButton';
import ToggleCheckbox from '../../../UI/toggleCheckbox/ToggleCheckbox';
import MySelect from '../../../UI/select/MySelect';
import MyInput from '../../../UI/input/MyInput';
import { CountryEnum, IFormInput, PersonCard } from '../../../../interfaces';
import { Types } from '../../../../store/reducers';
import { AppContext } from '../../../../store/context';

const defaultValues: IFormInput = {
  name: '',
  surname: '',
  date: '',
  country: CountryEnum.ua,
  file: '',
  dataProcessing: false,
};

const Form: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    clearErrors,
  } = useForm<IFormInput>({
    defaultValues: {
      name: state.formPage.form.name,
      surname: state.formPage.form.surname,
      date: state.formPage.form.date,
      country: state.formPage.form.country,
      file: '',
      dataProcessing: state.formPage.form.dataProcessing,
    },
  });

  useEffect(() => {
    return () => {
      const { name, surname, date, country, dataProcessing } = getValues();
      dispatch({
        type: Types.ChangeForm,
        payload: {
          name,
          surname,
          date,
          country,
          file: '',
          dataProcessing,
        },
      });
    };
  }, [dispatch, getValues]);

  const [logo, setLogo] = useState<null | string>(null);

  function resetForm() {
    reset(defaultValues);
    dispatch({ type: Types.ChangeForm, payload: defaultValues });
    setLogo(null);
    dispatch({ type: Types.DisableSubmit });
  }

  const onFormSubmit: SubmitHandler<IFormInput> = (data) => {
    const newCard: PersonCard = {
      name: data.name,
      surname: data.surname,
      date: data.date,
      country: data.country,
      img: logo,
      dataProcessing: data.dataProcessing,
    };

    dispatch({ type: Types.AddCard, payload: newCard });
    resetForm();
  };

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name as keyof IFormInput;
    if (name === 'file' && e.target.files?.length) {
      setLogo(URL.createObjectURL(e.target.files[0]));
    } else if (name === 'file' && e.target.files?.length === 0) {
      setLogo(null);
    }
    if (errors[name]) {
      clearErrors(name);
    }
  }

  const submitButtonDisable = () => {
    if (
      state.formPage.submitBtnDisable ||
      errors.country ||
      errors.dataProcessing ||
      errors.date ||
      errors.file ||
      errors.name ||
      errors.surname
    ) {
      return true;
    } else {
      return false;
    }
  };

  const name = register('name', {
    required: 'Required name',
    minLength: {
      value: 3,
      message: 'Min chars 3',
    },
  });
  const surname = register('surname', {
    required: 'Required surname',
    minLength: {
      value: 3,
      message: 'Min chars 3',
    },
  });
  const file = register('file', {
    validate: (data) => data.length > 0,
  });
  const date = register('date', {
    required: 'Required date',
    validate: (date) => {
      const dataValue = new Date(date);
      const currentDay = new Date();
      return dataValue <= currentDay;
    },
  });
  const country = register('country');
  const dataProcessing = register('dataProcessing', {
    validate: (data) => data,
  });

  return (
    <form
      className="cardForm"
      onChange={() => dispatch({ type: Types.EnableSubmit })}
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <MyInput
        label="Name"
        register={name}
        onChange={onChangeHandler}
        error={errors.name}
        data-testid="input-name"
      />
      <MyInput
        label="Surname"
        register={surname}
        error={errors.surname}
        onChange={onChangeHandler}
        data-testid="input-surname"
      />
      <MyInput
        type="file"
        label="Avatar"
        image={logo}
        register={file}
        error={errors.file}
        errorMessage="You should download avatar"
        onChange={onChangeHandler}
        data-testid="input-file"
      />
      <MyInput
        type="date"
        label="Birth date"
        error={errors.date}
        errorMessage="Pick correct birth date"
        register={date}
        onChange={onChangeHandler}
        data-testid="input-date"
      />
      <MySelect
        label="Choose your country"
        values={['UA', 'USA', 'PL', 'D', 'SP']}
        register={country}
        name="country"
        data-testid="select-country"
      />
      <ToggleCheckbox
        label="Agree to data processing"
        register={dataProcessing}
        error={errors.dataProcessing}
        errorMessage="you should agree"
        data-testid="input-dataProcessing"
      />

      <div className="cardForm__buttons">
        <MyButton type="submit" disable={submitButtonDisable()} data-testid="button-submit">
          Create card
        </MyButton>
        <MyButton type="reset" onClick={() => resetForm()} data-testid="button-reset">
          Reset
        </MyButton>
      </div>
    </form>
  );
};

export default Form;
