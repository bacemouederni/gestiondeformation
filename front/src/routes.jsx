import React from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import Header from './components/header';
import Login from './components/login';
import GestionFormateur from './components/gestionFormateur';
import GestionFormation from './components/gestionFormation';
import Participant from './components/participant';
import Session from './components/session';
import EditFormation from './components/editFormation';
import EditFormateur from './components/editFormateur';
import EditParticipant from './components/editParticipant';
import EditSession from './components/editSession';
import Home from './components/home';

import './App.css';

export default function Routes() {
  const location = useLocation();
  const excludeHeaderPaths = ['/'];

  const shouldRenderHeader = !excludeHeaderPaths.includes(location.pathname);

  const router = useRoutes([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/home',
      element: <Home/>,
    },
    {
      path: '/gestionFormateur',
      element: <GestionFormateur />,
    },
    {
      path: '/gestionFormation',
      element: <GestionFormation />,
    },
    {
      path: '/participant',
      element: <Participant />,
    },
    {
      path: '/editParticipant/:id',
      element: <EditParticipant />,
    },
    {
      path: '/session',
      element: <Session />,
    },
    {
      path: '/editSession/:id',
      element: <EditSession />,
    },
    {
      path: '/editFormation/:id',
      element: <EditFormation />,
    },
    {
      path: '/editFormateur/:id',
      element: <EditFormateur />,
    },
  ]);

  return (
    <>
      {shouldRenderHeader && <Header />}
      {router}
    </>
  );
}
