import { 
    Outlet, 
    NavLink,
    Link, 
    useLoaderData,
    Form,
 } from "react-router-dom";
import { getTrips, createTrip } from "../trips";
import React from 'react';
import "../index.css";

export async function loader() {
    const trips = await getTrips();
    return trips ;
  }
  
export async function action() {
    await createTrip();
  }

export default function Root() {
    const trips = useLoaderData();
    console.log(trips) 
    return (
      <>
        <div id="sidebar">
          <h1>Trip Wizard</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search trips"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
            <Form method="post">
                <button type="submit">New Trip</button>
            </Form>
          </div>
          <nav>
          {trips.length ? (
            <ul>
              {trips.map((trip) => (
                <li key={trip.id}>
                  <NavLink 
                    to={`trips/${trip.id}`}
                    className={({ isActive, isPending }) =>
                    isActive
                    ? "active"
                    : isPending
                    ? "pending"
                    : ""
              }
                >
                    {trip.name ? (
                      <>
                        {trip.name}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {trip.favorite && <span>★</span>}
                  </NavLink>
                  </li>
              ))}
               </ul>
          ) : (
            <p>
              <i>No trips</i>
            </p>
          )}
          </nav>
        </div>
        <div id="detail">
            <Outlet />
        </div>
      </>
    );
  }

  