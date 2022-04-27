import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import { routes } from '../../routes/routes';
import { AppProvider } from '../../store/context';

export default function App() {
  const pages = routes.map((page, index) => (
    <Route key={index} path={page.path} element={<page.element />}></Route>
  ));

  return (
    <AppProvider>
      <div className="App">
        <Header routes={routes} />
        <Routes>{pages}</Routes>
      </div>
    </AppProvider>
  );
}
