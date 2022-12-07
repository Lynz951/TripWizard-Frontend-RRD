import { 
    Form,
    useLoaderData,  
 } from "react-router-dom";
 import { getTrip } from "../trips";
 import sunset from '../sunsetbeach.jpeg';
 import { format, compareAsc } from "date-fns";
 import axios from 'axios';
 import { useEffect, useState } from 'react';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import { faCoffee } from '@fortawesome/free-solid-svg-icons'

export async function loader({ params }) {
  return getTrip(params.tripId);
}


export default function Trip() {

  const trip = useLoaderData();
  const startDate = format(new Date(trip.start_date), 'MM/dd/yyyy')
  const endDate = format(new Date(trip.end_date), 'MM/dd/yyyy')
  const [data, setData] = useState([])
    
  useEffect(() => {
      axios.get(`https://8000-lynz951-tripwizardbacke-gwc815o36p3.ws-us77.gitpod.io/api/plan/${trip.id}/`)
          .then((response) => {
              setData(response.data);
           });
  }, []);
      console.log(data)
      if(data.length === 0) {
          return null
      }

  return (
    <>
    <div id="trip">
      <div>
        <img
          src= {sunset}
        />
      </div>

      <div>
        {trip.name && <h1>{trip.name}</h1>}
        <h2>
          {startDate || endDate ? (
            <>
              Leave: {startDate} Return: {endDate}
            </>
          ) : (
            <i>No Dates</i>
          )}{" "}
         
        </h2>


        {trip.description && <p>{trip.description}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this trip."
                )
              ) {
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
           
            <ul>
              <>
              {(data.plantype_id === 1) && <FontAwesomeIcon icon="fa-solid fa-plane" />}
              {(data.plantype_id === 2) && <FontAwesomeIcon icon="fa-solid fa-bed" />}
              {(data.plantype_id === 3) && <FontAwesomeIcon icon="fa-solid fa-car" />}
              {(data.plantype_id === 4) && <FontAwesomeIcon icon="fa-solid fa-music" />}
              {(data.plantype_id === 5) && <FontAwesomeIcon icon="fa-solid fa-ship" />}
              {(data.plantype_id === 6) && <FontAwesomeIcon icon="fa-solid fa-compass" />}
              {(data.plantype_id === 7) && <FontAwesomeIcon icon="fa-solid fa-map" />}
              {(data.plantype_id === 8) && <FontAwesomeIcon icon="fa-solid fa-handshake" />}
              {(data.plantype_id === 9) && <FontAwesomeIcon icon="fa-solid fa-train-subway" />}
              {(data.plantype_id === 10) && <FontAwesomeIcon icon="fa-solid fa-bus" />}
              {(data.plantype_id === 11) && <FontAwesomeIcon icon="fa-solid fa-ferry" />}
              {(data.plantype_id === 12) && <FontAwesomeIcon icon="fa-solid fa-square-parking" />}
              {(data.plantype_id === 13) && <FontAwesomeIcon icon="fa-solid fa-utensils" />}
              {(data.plantype_id === 14) && <FontAwesomeIcon icon="fa-solid fa-masks-theater" />}
              {(data.plantype_id === 15) && <FontAwesomeIcon icon="fa-solid fa-binoculars" />}
              {(data.plantype_id === 16) && <FontAwesomeIcon icon="fa-solid fa-person-hiking" />}
              {(data.plantype_id === 17) && <FontAwesomeIcon icon="fa-solid fa-clipboard" />}
              {(data.plantype_id === 18) && <FontAwesomeIcon icon="fa-solid fa-van-shuttle" />}
              </>
              <li key={data.id}>
              <h4>{data.name} </h4> 
              <h5>Plan Type: {data.plantype_name}
                  Start Date: {data.departure_date}
                  <br />
                  Location: {data.dep_location}</h5>
              </li>       
            </ul>
    </div>
    </>
  );
}

