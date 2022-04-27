import React from 'react';
import { render, screen } from '@testing-library/react';
import CharacterCards from './CharacterCards';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

describe('Form component', () => {
  const showInfo = jest.fn();

  const characters = [
    {
      birth: '',
      death: '',
      gender: 'male',
      hair: '',
      height: '',
      name: 'Aragorn',
      race: 'NaN',
      realm: '',
      spouse: '',
      wikiUrl: '',
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

  test('render cards', () => {
    render(
      <BrowserRouter>
        <CharacterCards characters={characters} />
      </BrowserRouter>
    );
    const cards = screen.getAllByTestId('character-card-test');
    expect(cards.length).toEqual(2);
  });

  test('no cards message', () => {
    render(
      <BrowserRouter>
        <CharacterCards characters={[]} />
      </BrowserRouter>
    );
    const cards = screen.queryAllByTestId('character-card-test');
    expect(cards.length).toEqual(0);
    expect(screen.getByText(/No matches/i)).toBeInTheDocument;
  });

  test('race NaN becomes unknown', () => {
    render(
      <BrowserRouter>
        <CharacterCards characters={characters} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Unknown/i)).toBeInTheDocument;
  });
});
