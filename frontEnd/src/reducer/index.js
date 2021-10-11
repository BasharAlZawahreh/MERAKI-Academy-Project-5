import { createStore, combineReducers } from "redux";
import user from "./users"
import reservation from "./Reservations"
import car from "./cars"
import token from './login'
import searches from "./search";

const reducers = combineReducers({user,reservation,car,token,searches });
const store = createStore(reducers);

export default store;
