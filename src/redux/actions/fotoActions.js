import * as types from "./actionTypes";
import * as fotoApi from "../../api/tourApi";
//loads tours when the app initiallt loads

export function createTour(tour) {
  return { type: types.CREATE_TOUR, tour };
}

export function loadFotosSuccess(fotos) {
  return { type: types.LOAD_FOTOS_SUCCESS, fotos };
}

//async calls
export function loadFotos() {
  return function (dispatch) {
    return fotoApi
      .getTours()
      .then((tours) => {
        dispatch(loadCourseSuccess(tours));
      })
      .catch((error) => {
        throw error;
      });
  };
}
