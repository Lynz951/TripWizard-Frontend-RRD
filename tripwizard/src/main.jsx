import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import './index.css'
import Root, {
  loader as rootLoader,
  action as rootAction,
} from './routes/root';
import ErrorPage from "./error-page";
import Trip, {
  loader as tripLoader,
} from './routes/trip';
import Index from "./routes/index";
import NewTripForm from './components/NewTripForm';
import localForage from "localforage";

const res = await fetch("https://8000-lynz951-tripwizardbacke-gwc815o36p3.ws-us77.gitpod.io/api/trip/");
  const trips = await res.json();
  localForage.setItem('trips', trips).then(function () {
    return localForage.getItem('trips');
  }).then(function (value) {
    // we got our value
    return value;
  }).catch(function (err) {
    // we got an error
    console.log(err);
  });


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index />},
      {
        path: "trips/:tripId",
        element: <Trip />,
        loader: tripLoader,
      },
      {
        path: "createtrip",
        element: <NewTripForm />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
