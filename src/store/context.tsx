import React, { createContext, useReducer, Dispatch } from 'react';
import { SortByType, SortType } from '../data/apiTypes';
import { CountryEnum } from '../interfaces';
import { getValueFromLocal } from '../utils/functions';
import {
  formPageReducer,
  FormPageActions,
  ApiPageActions,
  apiPageReducer,
  IApiPage,
  IFormPage,
} from './reducers';

type InitialStateType = {
  formPage: IFormPage;
  apiPage: IApiPage;
};

const initialState = {
  formPage: {
    personCards: [],
    form: {
      name: '',
      surname: '',
      date: '',
      country: CountryEnum.ua,
      file: '',
      dataProcessing: false,
    },
    submitBtnDisable: true,
  },
  apiPage: {
    isFetchComplete: false,
    searchValue: getValueFromLocal('apiSearch'),
    characterData: {
      docs: [],
      limit: 50,
      offset: 0,
      page: 1,
      pages: 0,
      total: 0,
      sort: SortType.asc,
      sortBy: SortByType.name,
    },
    quotesData: [],
  },
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<FormPageActions | ApiPageActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { formPage, apiPage }: InitialStateType,
  action: FormPageActions | ApiPageActions
) => ({
  formPage: formPageReducer(formPage, action as FormPageActions),
  apiPage: apiPageReducer(apiPage, action as ApiPageActions),
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
