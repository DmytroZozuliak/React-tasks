export interface IData {
  num: number;
  name: string;
  count: number;
  country: string;
  year: number;
  shape: string;
  color: string;
  size: string;
  unique: boolean;
  condition: string;
  isChosen?: boolean;
}

export const data: IData[] = [
  {
    num: 2,
    name: 'Green ball with flowers',
    count: 0,
    country: 'UA',
    year: 2000,
    shape: 'ball',
    color: 'green',
    size: 'large',
    unique: true,
    condition: 'excellent',
  },
  {
    num: 5,
    name: 'Red grape',
    count: 4,
    country: 'USA',
    year: 1980,
    shape: 'figure',
    color: 'red',
    size: 'medium',
    unique: true,
    condition: 'good',
  },
  {
    num: 7,
    name: 'Milky ball',
    count: 12,
    country: 'GB',
    year: 1960,
    shape: 'ball',
    color: 'white',
    size: 'medium',
    unique: true,
    condition: 'excellent',
  },
  {
    num: 18,
    name: 'Yellow ball with bow',
    count: 2,
    country: 'USA',
    year: 2010,
    shape: 'ball',
    color: 'yellow',
    size: 'large',
    unique: false,
    condition: 'excellent',
  },
  {
    num: 33,
    name: 'Blue ball with snowflake',
    count: 6,
    country: 'PL',
    year: 2010,
    shape: 'ball',
    color: 'blue',
    size: 'medium',
    unique: false,
    condition: 'good',
  },
  {
    num: 35,
    name: 'Figure of Fox',
    count: 8,
    country: 'SP',
    year: 1950,
    shape: 'figure',
    color: 'yellow',
    size: 'medium',
    unique: true,
    condition: 'excellent',
  },
  {
    num: 40,
    name: 'Golden snowflake',
    count: 12,
    country: 'DE',
    year: 2020,
    shape: 'snowflake',
    color: 'yellow',
    size: 'large',
    unique: false,
    condition: 'bad',
  },
  {
    num: 41,
    name: 'Arctic snowflake',
    count: 0,
    country: 'D',
    year: 2020,
    shape: 'snowflake',
    color: 'white',
    size: 'large',
    unique: false,
    condition: 'bad',
  },
  {
    num: 58,
    name: 'Figure of white bear',
    count: 2,
    country: 'D',
    year: 1980,
    shape: 'figure',
    color: 'white',
    size: 'medium',
    unique: false,
    condition: 'good',
  },
  {
    num: 60,
    name: 'Figure of Pigeon',
    count: 0,
    country: 'UA',
    year: 1940,
    shape: 'figure',
    color: 'white',
    size: 'medium',
    unique: true,
    condition: 'good',
  },
];