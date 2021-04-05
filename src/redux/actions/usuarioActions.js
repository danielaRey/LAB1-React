import * as types from "./actionTypes";
import * as usuarioApi from "../../api/usuarioApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function createUsuarioSuccess(usuario) {
  return { type: types.CREATE_USUARIO_SUCCESS, usuario };
}

export function saveUsuario(usuario) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return usuarioApi
      .saveUsuario(usuario)
      .then((savedUsuario) => {
        dispatch(createUsuarioSuccess(savedUsuario));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
