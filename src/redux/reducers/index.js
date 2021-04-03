import { combineReducers } from "redux";
import tours from "./tourReducer";
import fotos from "./fotoReducer";
import favoritos from "./favoritoReducer";
import reviews from "./reviewReducer";
import reservaciones from "./reservacionReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  tours,
  fotos,
  apiCallsInProgress,
  favoritos,
  reviews,
  reservaciones,
});

export default rootReducer;
