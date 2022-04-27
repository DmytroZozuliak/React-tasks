import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage component', () => {
  test('renders NotFoundPage', () => {
    render(<NotFoundPage />);

    const shopName = screen.getByText(/404/i);
    expect(shopName).toBeInTheDocument();
  });
});
