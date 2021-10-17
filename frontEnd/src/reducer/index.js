import { createStore, combineReducers } from "redux";
import user from "./users"
import reservation from "./Reservations"
import car from "./cars"
import token from './login'
import searches from "./search";
import adminToken from "./AdminReducers/Login";
import rate from "./Rates";

const reducers = combineReducers({user,reservation,car,token,searches, adminToken,rate });

const store = createStore(reducers);

export default store;
