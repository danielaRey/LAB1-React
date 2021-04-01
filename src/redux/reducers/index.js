import { combineReducers } from "redux";
import tours from "./tourReducer";

const rootReducer = combineReducers({
  tours,
});

export default rootReducer;
