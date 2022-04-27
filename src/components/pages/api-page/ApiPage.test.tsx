import React from 'react';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import ApiPage from './ApiPage';
import { BrowserRouter } from 'react-router-dom';
import { ICharacter } from '../../../data/apiTypes';
// jest.mock('axios');

type responseType = {
  docs: ICharacter[];
  limit: number;
  page: number;
  pages: number;
  total: number;
};

describe('Form component', () => {
  const characters = [
    {
      birth: '01.01.89',
      death: '',
      gender: 'male',
      hair: 'black',
      height: '1.80',
      name: 'Aragorn',
      race: 'human',
      realm: '',
      spouse: '',
      wikiUrl: 'wiki.url',
      _id: '1',
    },
    {
      birth: '',
      death: '',
      gender: 'male',
      hair: '',
      height: '',
      name: 'Gimli',
      race: 'dwarf',
      realm: '',
      spouse: '',
      wikiUrl: '',
      _id: '2',
    },
  ];

  const quotes = [
    {
      character: '1',
      dialog: 'I am Aragorn',
      id: 'quote1',
      movie: '',
      _id: 'quote1',
    },
    {
      character: 2,
      dialog: 'I am Gimli',
      id: 'quote2',
      movie: '',
      _id: 'quote2',
    },
  ];

  const server = setupServer(
    // https://the-one-api.dev/v2/character?name=//i&sort=name:asc&limit=50&page=1
    rest.get('https://the-one-api.dev/v2/character', (req, res, ctx) => {
      // req.url.searchParams;
      return res(
        ctx.status(200),
        ctx.json({ docs: characters, limit: 30, page: 1, pages: 1, total: 2 })
      );
    }),
    rest.get('https://the-one-api.dev/v2/quote', (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ docs: quotes }));
    })
  );

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  test('change language from select', async () => {
    render(<ApiPage />);
    const infoWrapper = screen.getByTestId('information-api-test');
    const selectLanguage = screen.getByTestId('character-select-test');
    expect(infoWrapper).toBeInTheDocument();
    expect(selectLanguage).toBeInTheDocument();

    userEvent.selectOptions(selectLanguage, 'dwarfs');
    expect(infoWrapper).toHaveClass('dwarfs');
  });
});
