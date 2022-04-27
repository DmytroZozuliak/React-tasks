import { ICharacter, IQuote, SortByType, SortType } from '../data/apiTypes';
import { IFormInput, PersonCard } from '../interfaces';

/* eslint-disable prettier/prettier */
export enum Types {
  Create = 'CREATE_PRODUCT',
  AddCard = 'ADD_FORM_CARD',
  ChangeForm = 'CHANGE_FORM_VALUES',
  DisableSubmit = 'DISABLE_SUBMIT_BUTTON',
  EnableSubmit = 'ENABLE_SUBMIT_BUTTON',
  ChangeSearch = 'CHANGE_SEARCH_VALUE',
  SetCharactersData = 'SET_ALL_CHARACTERS_OBJ',
  SetAllQuotes = 'SET_ALL_QUOTES',
  SetFetchComplete = 'SET_FETCH_COMPLETE',
}

// FormPage
export interface IFormPage {
  personCards: PersonCard[];
  form: IFormInput;
  submitBtnDisable: boolean,
}

export type FormPageActions = { type: Types.AddCard; payload: PersonCard; } |
{ type: Types.ChangeForm; payload: IFormInput; } | { type: Types.DisableSubmit; } | { type: Types.EnableSubmit; };

export const formPageReducer = (state: IFormPage, action: FormPageActions) => {
  switch (action.type) {
    case Types.AddCard:
      return ({
        ...state,
        personCards: [...state.personCards, action.payload]
      }
      );
    case Types.ChangeForm:
      return ({
        ...state,
        form: action.payload
      }
      );
    case Types.DisableSubmit:
      return ({
        ...state,
        submitBtnDisable: true
      }
      );
    case Types.EnableSubmit:
      return ({
        ...state,
        submitBtnDisable: false
      }
      );
    default:
      return state;
  }
};

// ApiPage
export interface IApiPage {
  isFetchComplete: boolean;
  searchValue: string;
  characterData: {
    docs: ICharacter[];
    limit: number;
    offset: number;
    page: number;
    pages: number;
    total: number;
    sort: SortType;
    sortBy: SortByType,
  };
  quotesData: IQuote[];
}

export type ApiPageActions = { type: Types.ChangeSearch; payload: string; } | {
  type: Types.SetCharactersData; payload: {
    docs: ICharacter[];
    limit: number;
    offset: number;
    page: number;
    pages: number;
    total: number;
    sort: SortType;
    sortBy: SortByType,
  };
} | { type: Types.SetAllQuotes; payload: IQuote[]; } | { type: Types.SetFetchComplete; payload: boolean; };

export const apiPageReducer = (state: IApiPage, action: ApiPageActions) => {
  switch (action.type) {
    case Types.ChangeSearch:
      return ({
        ...state,
        searchValue: action.payload
      });
    case Types.SetCharactersData:
      return ({
        ...state,
        characterData: action.payload
      });
    case Types.SetAllQuotes:
      return ({
        ...state,
        quotesData: action.payload
      });
    case Types.SetFetchComplete:
      return ({
        ...state,
        isFetchComplete: action.payload
      });
    default:
      return state;
  }
};
