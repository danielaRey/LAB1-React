import { combineReducers } from "redux";
import courses from "./courseReducer";
import tours from "./tourReducer";

const rootReducer = combineReducers({
  courses,
  tours,
});

export default rootReducer;
