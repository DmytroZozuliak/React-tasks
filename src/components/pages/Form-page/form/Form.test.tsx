import React from 'react';
import { render, screen } from '@testing-library/react';
import Form from './Form';
import userEvent from '@testing-library/user-event';

describe('Form component', () => {
  global.URL.createObjectURL = jest.fn();

  test('type input name', () => {
    render(<Form />);
    const inputName = screen.getByTestId('input-name');
    userEvent.type(inputName, '12');
    expect(inputName).toHaveValue('12');
  });

  test('type input surname', () => {
    render(<Form />);
    const inputSurname = screen.getByTestId('input-surname');
    userEvent.type(inputSurname, 'surname typing');
    expect(inputSurname).toHaveValue('surname typing');
  });

  test('type input date', () => {
    render(<Form />);
    const inputDate = screen.getByTestId('input-date');
    userEvent.type(inputDate, '2020-01-02');
    expect(inputDate).toHaveValue('2020-01-02');
  });

  test('type input dataProcessing', () => {
    render(<Form />);
    const inputCheck = screen.getByTestId('input-dataProcessing');
    userEvent.click(inputCheck);
    expect(inputCheck).toBeChecked;
  });

  test('check after type input name submit - enable', () => {
    render(<Form />);
    const input = screen.getByTestId('input-name');
    userEvent.type(input, 'na');
    expect(input).toHaveValue('na');
  });

  test('file upload', () => {
    render(<Form />);
    const file = new File(['img'], 'chucknorris.png', { type: 'image/png' });
    const input = screen.getByTestId('input-file') as HTMLInputElement;
    userEvent.upload(input, file);
    expect(input.files).toHaveLength(1);
  });
});
