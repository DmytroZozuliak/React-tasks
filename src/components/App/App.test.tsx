import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

describe('App component', () => {
  test('renders App', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const shopName = screen.getByText(/lord/i);
    expect(shopName).toBeInTheDocument();
  });
});
