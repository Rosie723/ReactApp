import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './Login';  // Import the Login component
import Dashboard from './Dashboard';  // Example of another page to navigate to
import Register from './Register';  // Import the Register component
// Define the routes for your application
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,  // Login route
  },
  {
    path: "/dashboard",  // Dashboard route after login
    element: <Dashboard />,
  },
  {
    path: "/register",  // Add the route for Register
    element: <Register />,  // Define the Register component
  },
]);

// Render the application with RouterProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);



/*import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './Login'; // Assuming you have a Login component

// Define the routes for your application
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,  // Ensure you have the correct route for /login
  },
]);

// Render the application with RouterProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
*/
/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';

// Define the routes for your application
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  // Define other routes here as needed
]);

// Render the application with RouterProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
*/