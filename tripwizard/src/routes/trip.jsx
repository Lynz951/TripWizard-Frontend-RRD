import { Form, useLoaderData } from "react-router-dom";
import { getTrip } from "../trips";
import sunset from "../sunsetbeach.jpeg";
import { format, compareAsc } from "date-fns";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

export async function loader({ params }) {
  return getTrip(params.tripId);
}

export default function Trip() {
  const trip = useLoaderData();
  const startDate = format(new Date(trip.start_date), "MM/dd/yyyy");
  const endDate = format(new Date(trip.end_date), "MM/dd/yyyy");
  const [data, setData] = useState([]);
  // const navigate = useNavigate();

  // function handlesubmit() {
  //   navigate('/createplan/');
  // }

  useEffect(() => {
    axios
      .get(
        `https://8000-lynz951-tripwizardbacke-gwc815o36p3.ws-us77.gitpod.io/api/plan/${trip.id}/`
      )
      .then((response) => {
        setData(response.data);
      });
  }, [trip]);
  console.log({ trip });
  console.log(data);
  // if (data.length === 0) {
  //   return null;
  // }

  return (
    <>
      <div id="trip">
        <div>
          <img src={sunset} />
        </div>

        <div>
          {trip.name && <h1>{trip.name}</h1>}
          <h2>
            {startDate || endDate ? (
              <>
                Leave: {startDate} <br /> Return: {endDate}
              </>
            ) : (
              <i>No Dates</i>
            )}{" "}
          </h2>

          {trip.description && <h6>{trip.description}</h6>}

          <div>
            <Form action="edit">
              <button type="submit">Edit</button>
            </Form>
            <Form
              method="post"
              action="destroy"
              onSubmit={(event) => {
                if (!confirm("Please confirm you want to delete this trip.")) {
                  event.preventDefault();
                }
              }}
            >
              <button type="submit">Delete</button>
            </Form>
          </div>
        </div>
      </div>
      <div id="plans">
        <h1>ITINERARY</h1>
        {/* <div>
            <button type="submit" onClick={handlesubmit}>New Trip</button>
            </div> */}
        <ul>
          {data.map((plan) => {
            return (
              <li key={plan.id}>
                {plan.plantype_id === 1 && (
                  <FontAwesomeIcon icon="fa-solid fa-plane" />
                )}
                {plan.plantype_id === 2 && (
                  <FontAwesomeIcon icon="fa-solid fa-bed" />
                )}
                {plan.plantype_id === 3 && (
                  <FontAwesomeIcon icon="fa-solid fa-car" />
                )}
                {plan.plantype_id === 4 && (
                  <FontAwesomeIcon icon="fa-solid fa-music" />
                )}
                {plan.plantype_id === 5 && (
                  <FontAwesomeIcon icon="fa-solid fa-ship" />
                )}
                {plan.plantype_id === 6 && (
                  <FontAwesomeIcon icon="fa-solid fa-compass" />
                )}
                {plan.plantype_id === 7 && (
                  <FontAwesomeIcon icon="fa-solid fa-map" />
                )}
                {plan.plantype_id === 8 && (
                  <FontAwesomeIcon icon="fa-solid fa-handshake" />
                )}
                {plan.plantype_id === 9 && (
                  <FontAwesomeIcon icon="fa-solid fa-train-subway" />
                )}
                {plan.plantype_id === 10 && (
                  <FontAwesomeIcon icon="fa-solid fa-bus" />
                )}
                {plan.plantype_id === 11 && (
                  <FontAwesomeIcon icon="fa-solid fa-ferry" />
                )}
                {plan.plantype_id === 12 && (
                  <FontAwesomeIcon icon="fa-solid fa-square-parking" />
                )}
                {plan.plantype_id === 13 && (
                  <FontAwesomeIcon icon="fa-solid fa-utensils" />
                )}
                {plan.plantype_id === 14 && (
                  <FontAwesomeIcon icon="fa-solid fa-masks-theater" />
                )}
                {plan.plantype_id === 15 && (
                  <FontAwesomeIcon icon="fa-solid fa-binoculars" />
                )}
                {plan.plantype_id === 16 && (
                  <FontAwesomeIcon icon="fa-solid fa-person-hiking" />
                )}
                {plan.plantype_id === 17 && (
                  <FontAwesomeIcon icon="fa-solid fa-clipboard" />
                )}
                {plan.plantype_id === 18 && (
                  <FontAwesomeIcon icon="fa-solid fa-van-shuttle" />
                )}

                <h4>{plan.name} </h4>
                <h5>
                  Start Date: {plan.departure_date}
                  <br />
                  Location: {plan.dep_location}
                </h5>
                <div class="container">
                <button type="submit">View Details</button>
                <Form action="edit">
                  <button type="submit">Edit</button>
                </Form>
                <Form
                  method="post"
                  action="destroy"
                  onSubmit={(event) => {
                    if (
                      !confirm("Please confirm you want to delete this trip.")
                    ) {
                      event.preventDefault();
                    }
                  }}
                >
                  <button type="submit">Delete</button>
                </Form>
               
                </div>

              </li>
             
            );
          })}
        </ul>
      </div>
    </>
  );
}
