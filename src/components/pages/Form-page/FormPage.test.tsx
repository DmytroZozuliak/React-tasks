import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FormPage from './FormPage';
import { act } from 'react-dom/test-utils';

describe('CardsForm component', () => {
  global.URL.createObjectURL = jest.fn();

  test('renders with no cards', () => {
    render(<FormPage />);

    const cardsElement = screen.queryByTestId('form-card');
    expect(cardsElement).toBeNull;
  });

  test('create 1 card', async () => {
    const { getByTestId } = render(<FormPage />);

    const inputName = getByTestId('input-name');
    const inputSurname = getByTestId('input-surname');
    const inputDate = getByTestId('input-date');
    const inputFile = getByTestId('input-file') as HTMLInputElement;
    const inputCheck = getByTestId('input-dataProcessing') as HTMLInputElement;
    const submitButton = getByTestId('button-submit');
    const resetButton = getByTestId('button-reset');

    await act(async () => {
      fireEvent.click(resetButton);
    });
    await act(async () => {
      fireEvent.change(inputName, { target: { value: 'name124' } });
      fireEvent.blur(inputName);
      fireEvent.change(inputSurname, { target: { value: 'surname124' } });
      fireEvent.blur(inputSurname);
      fireEvent.change(inputDate, { target: { value: '1989-04-04' } });
      fireEvent.blur(inputDate);
      fireEvent.change(inputFile, {
        target: {
          files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })],
        },
      });
      fireEvent.blur(inputFile);
      fireEvent.click(inputCheck);
      fireEvent.blur(inputCheck);
    });
    expect(inputName).toHaveValue('name124');
    await act(async () => {
      fireEvent.click(submitButton);
    });
  });
});
