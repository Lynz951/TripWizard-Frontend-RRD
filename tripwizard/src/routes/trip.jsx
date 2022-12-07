import { 
    Form,
    useLoaderData,  
 } from "react-router-dom";
 import { getTrip } from "../trips";
 import sunset from '../sunsetbeach.jpeg';
 import { format, compareAsc } from "date-fns";
 import axios from 'axios';
 import { useEffect, useState } from 'react';

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
           
              <li key={data.id}>
              <h4>{data.name} </h4> 
              <h5>Start Date: {data.departure_date}
                  <br />
                  Location: {data.dep_location}</h5>
              </li>       
            </ul>
    </div>
    </>
  );
}

