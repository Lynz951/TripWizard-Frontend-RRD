import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
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
import NewPlanForm from './components/NewPlanForm';
import { action as destroyAction } from "./routes/destroy";

  
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
      },
      { 
        path: "createplan",
        element: <NewPlanForm />
      },
      {
        path: "trips/:tripId/destroy",
        action: destroyAction,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
