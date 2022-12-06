import './App.css';
import Application from './Screens';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import ErrorPage from './Screens/ErrorPage/ErrorPage';
import Dashboard from './Screens/Dashboard/Dashboard';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Application />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
