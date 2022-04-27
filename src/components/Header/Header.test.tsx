import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { Routes } from '../../routes/routes';
import { BrowserRouter } from 'react-router-dom';
import AboutPage from '../pages/about-page/AboutPage';

const routes: Routes[] = [
  {
    path: '/',
    element: AboutPage,
    linkMessage: 'About page',
  },
];

describe('Header component', () => {
  test('renders Header', () => {
    render(
      <BrowserRouter>
        <Header routes={routes} />
      </BrowserRouter>
    );

    const navigation = screen.getByRole('navigation');
    expect(navigation).toBeInTheDocument();
  });
});
