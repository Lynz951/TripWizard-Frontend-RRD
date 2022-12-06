import { 
    Form,
    useLoaderData,  
 } from "react-router-dom";
 import { getTrip } from "../trips";
 import sunset from '../sunsetbeach.jpeg';
 import { format, compareAsc } from "date-fns";



export async function loader({ params }) {
  return getTrip(params.tripId);
}

export default function Trip() {

  const trip = useLoaderData();
  const startDate = format(new Date(trip.start_date), 'MM/dd/yyyy')
  const endDate = format(new Date(trip.end_date), 'MM/dd/yyyy')

  return (
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
          <Favorite trip={trip} />
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
  );
}

function Favorite({ trip }) {
  // yes, this is a `let` for later
  let favorite = trip.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}