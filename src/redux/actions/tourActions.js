import * as types from "./actionTypes";
import * as tourApi from "../../api/tourApi";
//loads tours when the app initiallt loads

export function createTour(tour) {
  return { type: types.CREATE_TOUR, tour };
}

export function loadCourseSuccess(tours) {
  return { type: types.LOAD_TOURS_SUCCESS, tours };
}

//async calls
export function loadTours() {
  return function (dispatch) {
    return tourApi
      .getTours()
      .then((tours) => {
        dispatch(loadCourseSuccess(tours));
      })
      .catch((error) => {
        throw error;
      });
  };
}
