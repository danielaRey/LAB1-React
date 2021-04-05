import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function reservacionReducer(
  state = initialState.reservaciones,
  action
) {
  switch (action.type) {
    case types.CREATE_RESERVACION_SUCCESS:
      return [...state, { ...action.reservacion }];
    case types.UPDATE_RESERVACION_SUCCESS:
      return state.map((reservacion) =>
        reservacion.id === action.reservacion.id
          ? action.reservacion
          : reservacion
      );
    case types.LOAD_RESERVACIONES_SUCCESS:
      return action.reservaciones;
    default:
      return state;
  }
}
