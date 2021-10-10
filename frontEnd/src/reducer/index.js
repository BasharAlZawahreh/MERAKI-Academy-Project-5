import { createStore, combineReducers } from "redux";
import user from "./users"
import Reservation from "./Reservations"
import car from "./cars"

const reducers = combineReducers({user,Reservation,car });

const store = createStore(reducers);

export default store;