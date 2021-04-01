import * as types from "./actionTypes";
import * as tourApi from "../../api/tourApi";
//loads tours when the app initiallt loads

export function loadTourSuccess(tours) {
  return { type: types.LOAD_TOURS_SUCCESS, tours };
}

export function updateTourSuccess(tour) {
  return { type: types.UPDATE_TOUR_SUCCESS, tour };
}

export function createTourSuccess(tour) {
  return { type: types.CREATE_TOUR_SUCCESS, tour };
}

//async calls
export function loadTours() {
  return function (dispatch) {
    return tourApi
      .getTours()
      .then((tours) => {
        dispatch(loadTourSuccess(tours));
      })
      .catch((error) => {
        throw error;
      });
  };
}

//save
export function saveTour(tour) {
  return function (dispatch) {
    return tourApi
      .saveTour(tour)
      .then((savedTour) => {
        tour.id
          ? dispatch(updateTourSuccess(savedTour))
          : dispatch(createTourSuccess(savedTour));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// export function saveTour(tour) {
//   debugger;
//   return function (dispatch) {
//     return tourApi
//       .saveTour(tour)
//       .then((savedTour) => {
//         dispatch(createTourSuccess(savedTour));
//       })
//       .catch((error) => {
//         throw error;
//       });
//   };
// }
