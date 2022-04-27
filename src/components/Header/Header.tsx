import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Routes } from '../../routes/routes';

interface Props {
  routes: Routes[];
}

const Header: FC<Props> = (props) => {
  const { routes } = props;
  const classLink = 'header__navbar-link';

  const filteredRoutes = routes.map((page, index) => {
    return (
      page.linkMessage && (
        <NavLink
          key={index}
          className={({ isActive }) => (isActive ? classLink + ' active-page' : classLink)}
          to={page.path}
        >
          {page.linkMessage}
        </NavLink>
      )
    );
  });

  return (
    <header className="container header__container">
      <nav className="header__navbar">{filteredRoutes}</nav>
    </header>
  );
};

export default Header;
