import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const Layout = lazy(() => import('@/layout'));
const Postman = lazy(() => import('@/pages/Postman'));
const Error = lazy(() => import('@/pages/Error'));
const NoMatch = lazy(() => import('@/pages/NoMatch'));

const routes = [
  {
    path: '/',
    exact: true,
    component: Layout,
    routes: [
      {
        path: '/',
        exact: true,
        component: Postman,
      },
      {
        path: '/*',
        render: () => <Redirect to="/*" />,
      },
    ],
  },
  {
    path: '/error',
    exact: true,
    component: Error,
  },
  {
    path: '/*',
    component: NoMatch,
  },
];

export default routes;
