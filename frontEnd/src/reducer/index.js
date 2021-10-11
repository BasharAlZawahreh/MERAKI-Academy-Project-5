import { createStore, combineReducers } from "redux";
import user from "./users";
import Reservation from "./Reservations";
import car from "./cars";
import searches from "./search";

const reducers = combineReducers({ user, Reservation, car, searches });

const store = createStore(reducers);

export default store;
