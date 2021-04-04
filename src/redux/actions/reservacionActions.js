import * as types from "./actionTypes";
import * as reservacionApi from "../../api/reservacionApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadReservacionSuccess(reservaciones) {
  return { type: types.LOAD_RESERVACIONES_SUCCESS, reservaciones };
}

export function updateReservacionSuccess(reservacion) {
  return { type: types.UPDATE_RESERVACION_SUCCESS, reservacion };
}

export function createReservacionSuccess(reservacion) {
  return { type: types.CREATE_RESERVACION_SUCCESS, reservacion };
}

//async calls
export function loadReservaciones() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return reservacionApi
      .getReservaciones()
      .then((reservaciones) => {
        dispatch(loadReservacionSuccess(reservaciones));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

//save
export function saveReservacion(reservacion) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return reservacionApi
      .saveReservacion(reservacion)
      .then((savedReservacion) => {
        reservacion.id
          ? dispatch(updateReservacionSuccess(savedReservacion))
          : dispatch(createReservacionSuccess(savedReservacion));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
