import { ICharacter, IFilterPagination, IQuote, SortByType, SortType } from './apiTypes';

export const baseUrl = 'https://the-one-api.dev/v2';
const quotesUrl = `${baseUrl}/quote`;
const charactersUrl = `${baseUrl}/character`;

const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer QCWRYhej4z3WGyy1CTGg', // dmytro
  // Authorization: 'Bearer fiyz6lUIy2S17G4TYYJL', // dohlaja
  // Authorization: 'Bearer _wZRVQG21nv9Ww1X6ABY',
};

export async function getAllCharactersFilters(
  value: string,
  limit = 50,
  page = 1,
  sort: SortType = SortType.asc,
  sortby: SortByType = SortByType.name
): Promise<IFilterPagination | number> {
  const rawCharacters = await fetch(
    `${charactersUrl}?name=/${value}/i&sort=${sortby}:${sort}&limit=${limit}&page=${page}`,
    {
      headers: headers,
    }
  );
  if (rawCharacters.status !== 200) {
    return rawCharacters.status;
  }

  const characters = await rawCharacters.json();
  return characters;
}

export async function getAllCharacters(): Promise<ICharacter[] | number> {
  const rawCharacters = await fetch(`${charactersUrl}`, { headers: headers });
  if (rawCharacters.status !== 200) {
    return rawCharacters.status;
  }
  const characters = await rawCharacters.json();
  return characters.docs;
}

export async function getCharacter(id: string): Promise<ICharacter | number> {
  const rawCharacters = await fetch(`${charactersUrl}?_id=${id}`, {
    headers: headers,
  });
  if (rawCharacters.status !== 200) {
    return rawCharacters.status;
  }
  const characters = await rawCharacters.json();
  const character: ICharacter = characters.docs[0];
  return character;
}

export async function getAllQuotes(): Promise<IQuote[] | number> {
  const rawQuotes = await fetch(`${quotesUrl}`, { headers: headers });
  if (rawQuotes.status !== 200) {
    return rawQuotes.status;
  }
  const quotes = await rawQuotes.json();
  return quotes.docs;
}

export async function getRandomQuote(): Promise<IQuote | number> {
  const rawQuotes = await fetch(`${quotesUrl}`, {
    headers: headers,
  });
  if (rawQuotes.status !== 200) {
    return rawQuotes.status;
  }
  const quotes = await rawQuotes.json();
  const quote: IQuote = quotes.docs[Math.floor(Math.random() * quotes.docs.length)];
  return quote;
}
