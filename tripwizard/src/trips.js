import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import axios from 'axios';

export async function getTrips(query) {
  let trips = await localforage.getItem("trips") || [];
  if (trips.length === 0) {
    const res = await fetch("https://trip-wizard-backend.ue.r.appspot.com/api/trip/");
    trips = await res.json();
    localforageĀ .setItem('trips', trips)
      .then(function () {
        return localforage.getItem('trips');
      })
      .then(function (value) {
        // we got our value
        return value;
      })
      .catch(function (err) {
        // we got an error
        console.log(err);
      });
  }
  if (!trips) trips = [];
  if (query) {
    trips = matchSorter(trips, query, { keys: ["startDate", "endDate"] });
  }
  return trips.sort(sortBy("startDate", "createdAt"));
}

export async function getTrip(id) {
  let tripId = Number(id);
  let trips = await localforage.getItem("trips");
  let trip = trips.find(trip => trip.id === tripId);
  return trip ?? null;
}

export async function action() {
  // something
}

export async function createTrip(trip) {
  let trips = await getTrips();
  trips.unshift(trip);
  await set(trips);
  return trip;
}

export async function createPlan(plan) {
  let plans = await getPlans();
  plans.unshift(plan);
  await set(plans);
  return plan;
}

export async function updateTrip(id, updates) {
  let tripId = Number(id);
  let trips = await localforage.getItem("trips");
  let trip = trips.findIndex(trip => trip.id === tripId);
  if (!trip) throw new Error("No trip found for", tripId);
  Object.assign(trip, updates);
  await set(trips);
  return trip;
}

export async function deleteTrip(id) {

  var data = {'trip_id': id};
  
  axios.delete('https://trip-wizard-backend.ue.r.appspot.com/api/trip/' + id)
  .then(function (response) {
      
  })
  .catch(function (error) {
      console.log(error);
  }); 
    
  let tripId = Number(id);
  let trips = await localforage.getItem("trips");
  let index = trips.findIndex(trip => trip.id === tripId);
  if (index > -1) {
    trips.splice(index, 1);
    await set(trips);
    return true;
  }
  return false;
}

function set(trips) {
  return localforage.setItem("trips", trips);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}