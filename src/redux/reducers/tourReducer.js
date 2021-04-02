import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function tourReducer(state = initialState.tours, action) {
  switch (action.type) {
    case types.CREATE_TOUR_SUCCESS:
      return [...state, { ...action.tour }];
    case types.UPDATE_TOUR_SUCCESS:
      return state.map((tour) =>
        tour.id === action.tour.id ? action.tour : tour
      );
    case types.LOAD_TOURS_SUCCESS:
      return action.tours;
    default:
      return state;
  }
}
