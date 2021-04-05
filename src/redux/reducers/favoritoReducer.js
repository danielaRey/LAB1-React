import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function favoritoReducer(
  state = initialState.favoritos,
  action
) {
  switch (action.type) {
    case types.CREATE_FAVORITO_SUCCESS:
      return [...state, { ...action.favorito }];
    case types.UPDATE_FAVORITO_SUCCESS:
      return state.map((favorito) =>
        favorito.id === action.favorito.id ? action.favorito : favorito
      );
    case types.LOAD_FAVORITO_SUCCESS:
      return action.favoritos;
    default:
      return state;
  }
}
