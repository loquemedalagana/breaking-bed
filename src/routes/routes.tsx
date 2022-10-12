import React from 'react';
import { RouteObject } from 'react-router-dom';

import CharacterDetailPage from 'src/pages/CharacterDetailPage';
import CharacterListPage from 'src/pages/CharacterListPage';
import ErrorPage from 'src/pages/ErrorPage';
import * as routeURL from 'src/routes/routeURL';
import RootLayout from 'src/routes/RootLayout';
import { URL_ERROR } from 'src/routes/routeURL';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: routeURL.URL_CHARACTERS,
        element: <CharacterListPage />,
      },
      {
        path: routeURL.URL_CHARACTER_DETAIL,
        element: <CharacterDetailPage />,
      },
    ],
  },
  {
    path: URL_ERROR,
    element: <ErrorPage />,
  },
];

export default routes;
