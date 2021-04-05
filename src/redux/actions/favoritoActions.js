import * as types from "./actionTypes";
import * as favoritoApi from "../../api/favoritoApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadFavoritoSuccess(favoritos) {
  return { type: types.LOAD_FAVORITOS_SUCCESS, favoritos };
}

export function updateFavoritoSuccess(favorito) {
  return { type: types.UPDATE_FAVORITO_SUCCESS, favorito };
}

export function createFavoritoSuccess(favorito) {
  return { type: types.CREATE_FAVORITO_SUCCESS, favorito };
}

//async calls
export function loadFavoritos() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return favoritoApi
      .getFavoritos()
      .then((favoritos) => {
        dispatch(loadFavoritoSuccess(favoritos));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

//save
export function saveFavorito(favorito) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return favoritoApi
      .saveFavorito(favorito)
      .then((savedFavorito) => {
        favorito.id
          ? dispatch(updateFavoritoSuccess(savedFavorito))
          : dispatch(createFavoritoSuccess(savedFavorito));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
