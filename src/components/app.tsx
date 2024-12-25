import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/admin">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/settings">Settings</Link>
        </li>
        <li>
          <Link to="/admin/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div>
    <Navbar />
    <div>
      <Outlet />
    </div>
  </div>
);
const Dashboard = () => <h1>Dashboard</h1>;
const Settings = () => <h1>Settings</h1>;
const Profile = () => <h1>Profile</h1>;

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: 'admin',
    element: <Layout />,
    children: [
      { path: 'settings', element: <Settings /> },
      { path: 'profile', element: <Profile /> }
    ]
  }
]);

export const App = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};