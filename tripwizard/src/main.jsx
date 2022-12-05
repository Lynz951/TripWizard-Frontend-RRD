import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import './index.css'
import Root, {
  action as rootAction,
} from './routes/root';
import ErrorPage from "./error-page";
import Trip, {
  loader as tripLoader,
} from './routes/trip';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: async ({ request }) => {
      const res = await fetch("https://8000-lynz951-tripwizardbacke-gwc815o36p3.ws-us77.gitpod.io/api/trip/", {
        signal: request.signal,
      });
      const trips = await res.json();
      return trips;
    },
    action: rootAction,
    children: [
      {
        path: "trips/:tripId",

        // loader={({ params }) => {
        //   // of course you can use any data store
        //   return fakeSdk.getTeam(params.gameId);
        // }}

        element: <Trip />,
        loader: tripLoader,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
