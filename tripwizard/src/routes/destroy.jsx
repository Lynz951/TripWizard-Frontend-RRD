import { redirect } from "react-router-dom";
import { deleteTrip } from "../trips";

export async function action({ params }) {
  await deleteTrip(params.tripId);
  return redirect("/");
}