import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getTrips(query) {
  let trips = await localforage.getItem("trips");
  if (!trips) trips = [];
  if (query) {
    trips = matchSorter(trips, query, { keys: ["startDate", "endDate"] });
  }
  return trips.sort(sortBy("startDate", "createdAt"));
}

export async function createTrip() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let trip = { id, createdAt: Date.now() };
  let trips = await getTrips();
  trips.unshift(trip);
  await set(trips);
  return trip;
}

export async function getTrip(id) {
  let tripId = Number(id);
  let trips = await localforage.getItem("trips");
  let trip = trips.find(trip => trip.id === tripId);
  return trip ?? null;
}

export async function updateTrip(id, updates) {
  let tripId = Number(id);
  let trips = await localforage.getItem("trips");
  let trip = trips.find(trip => trip.id === tripId);
  if (!trip) throw new Error("No trip found for", tripId);
  Object.assign(trip, updates);
  await set(trips);
  return trip;
}

export async function deleteTrip(id) {
  let trips = await localforage.getItem("trips");
  let index = trips.findIndex(trip => trip.id === id);
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