import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage.tsx';
import Home from './components/pages/Home.tsx';
import Movies from './components/pages/Movies.tsx';
import Genres from './components/pages/Genres.tsx';
import EditMovie from './components/pages/EditMovie.tsx';
import ManageCatalog from './components/pages/ManageCatalog.tsx';
import Graphql from './components/pages/Graphql.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: '/movies', element: <Movies /> },
      { path: '/genres', element: <Genres /> },
      { path: '/admin/movie/0', element: <EditMovie /> },
      { path: '/admin', element: <ManageCatalog /> },
      { path: '/graphql', element: <Graphql /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
