import AboutPage from '../components/pages/about-page/AboutPage';
import NotFoundPage from '../components/pages/404-page/NotFoundPage';
import FormPage from '../components/pages/Form-page/FormPage';
import ApiPage from '../components/pages/api-page/ApiPage';
import CardInfo from '../components/pages/api-page/CardInfo/CardInfo';

export interface Routes {
  path: string;
  element: React.ComponentType;
  linkMessage: string;
}

export enum RouteNames {
  main = '/',
  cardInfo = '/cards/:id',
  form = '/form',
  about = '/about',
  notFound = '*',
}

export const routes: Routes[] = [
  {
    path: RouteNames.main,
    element: ApiPage,
    linkMessage: 'main',
  },
  {
    path: RouteNames.cardInfo,
    element: CardInfo,
    linkMessage: '',
  },
  {
    path: RouteNames.form,
    element: FormPage,
    linkMessage: 'Form',
  },
  {
    path: RouteNames.about,
    element: AboutPage,
    linkMessage: 'About us',
  },
  {
    path: RouteNames.notFound,
    element: NotFoundPage,
    linkMessage: '',
  },
];
