import { combineReducers } from "redux";
import tours from "./tourReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  tours,
  apiCallsInProgress,
});

export default rootReducer;
