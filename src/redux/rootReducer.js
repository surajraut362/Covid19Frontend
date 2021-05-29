import { combineReducers } from "redux";
import hospitalReducer from "./hospitalReducer";
const rootReducer = combineReducers({
  hospitals: hospitalReducer,
});

export default rootReducer;
