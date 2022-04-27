export interface PersonCard {
  name: string;
  surname: string;
  date: string;
  country: string;
  img: string | null;
  dataProcessing: boolean;
}

export enum CountryEnum {
  ua = 'UA',
  usa = 'USA',
  pl = 'PL',
  d = 'D',
  sp = 'SP',
}
export interface IFormInput {
  name: string;
  surname: string;
  date: string;
  country: CountryEnum;
  file: string;
  dataProcessing: boolean;
}
