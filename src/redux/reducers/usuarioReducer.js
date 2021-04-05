import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function usuarioReducer(state = initialState.usuarios, action) {
  switch (action.type) {
    case types.CREATE_USUARIO_SUCCESS:
      return [...state, { ...action.usuario }];
    default:
      return state;
  }
}
