import * as types from "./actionTypes";
import * as fotoApi from "../../api/fotoApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadFotoSuccess(fotos) {
  return { type: types.LOAD_FOTOS_SUCCESS, fotos };
}

export function updateFotoSuccess(foto) {
  return { type: types.UPDATE_FOTO_SUCCESS, foto };
}

export function createFotoSuccess(foto) {
  return { type: types.CREATE_FOTO_SUCCESS, foto };
}

//async calls
export function loadFotos() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return fotoApi
      .getFotos()
      .then((fotos) => {
        dispatch(loadFotoSuccess(fotos));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

//save
export function saveFoto(foto) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return fotoApi
      .saveFoto(foto)
      .then((savedFoto) => {
        foto.id
          ? dispatch(updateFotoSuccess(savedFoto))
          : dispatch(createFotoSuccess(savedFoto));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
