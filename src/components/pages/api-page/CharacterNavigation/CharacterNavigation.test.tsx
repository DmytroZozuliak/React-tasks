import React from 'react';
import { render, screen } from '@testing-library/react';
import CharacterNavigation from './CharacterNavigation';
import userEvent from '@testing-library/user-event';

describe('CharacterNavigation component', () => {
  const onSubmitInput = jest.fn();
  const changeLanguage = jest.fn();

  test('render input in card navigation', () => {
    render(<CharacterNavigation onSubmitInput={onSubmitInput} changeLanguage={changeLanguage} />);
    const input = screen.getByTestId('character-input-test');
    expect(input).toBeInTheDocument();
  });

  test('render select in card navigation', () => {
    render(<CharacterNavigation onSubmitInput={onSubmitInput} changeLanguage={changeLanguage} />);
    const select = screen.getByTestId('character-select-test');
    expect(select).toBeInTheDocument();
  });

  test('choose select', () => {
    render(<CharacterNavigation onSubmitInput={onSubmitInput} changeLanguage={changeLanguage} />);
    const select = screen.getByTestId('character-select-test');
    userEvent.selectOptions(select, 'dwarfs');
    expect(select).toHaveValue('dwarfs');
  });
});
