import { createStore, combineReducers } from "redux";
import user from "./users"
import reservation from "./Reservations"
import car from "./cars"
import token from './login'

const reducers = combineReducers({user,reservation,car,token });

const store = createStore(reducers);

export default store;