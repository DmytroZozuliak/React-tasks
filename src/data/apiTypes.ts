export const APISStatus = {
  '200': 200,
  '401': 401,
  '402': 402,
  '403': 403,
};

export interface IFilterPagination {
  docs: ICharacter[];
  limit: number;
  offset: number;
  page: number;
  pages: number;
  total: number;
}

export interface ICharacter {
  birth: string;
  death: string;
  gender: string;
  hair: string;
  height: string;
  name: string;
  race: string;
  realm: string;
  spouse: string;
  wikiUrl: string;
  _id: string;
}

export interface IQuote {
  character: string;
  dialog: string;
  id: string;
  movie: string;
  _id: string;
}

export enum SortType {
  asc = 'asc',
  desc = 'desc',
}

export enum SortByType {
  name = 'name',
  race = 'race',
  gender = 'gender',
}
