import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function fotoReducer(state = initialState.fotos, action) {
  switch (action.type) {
    case types.CREATE_FOTO_SUCCESS:
      return [...state, { ...action.foto }];
    case types.UPDATE_FOTO_SUCCESS:
      return state.map((foto) =>
        foto.id === action.foto.id ? action.foto : foto
      );
    case types.LOAD_FOTOS_SUCCESS:
      return action.fotos;
    default:
      return state;
  }
}
