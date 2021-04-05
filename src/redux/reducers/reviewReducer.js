import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function reviewReducer(state = initialState.reviews, action) {
  switch (action.type) {
    case types.CREATE_REVIEW_SUCCESS:
      return [...state, { ...action.review }];
    case types.UPDATE_REVIEW_SUCCESS:
      return state.map((review) =>
        review.id === action.review.id ? action.review : review
      );
    case types.LOAD_REVIEWS_SUCCESS:
      return action.reviews;
    default:
      return state;
  }
}
