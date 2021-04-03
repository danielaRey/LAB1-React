import * as types from "./actionTypes";
import * as reviewApi from "../../api/reviewApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadReviewSuccess(reviews) {
  return { type: types.LOAD_REVIEWS_SUCCESS, reviews };
}

export function updateReviewSuccess(review) {
  return { type: types.UPDATE_REVIEW_SUCCESS, review };
}

export function createReviewSuccess(review) {
  return { type: types.CREATE_REVIEW_SUCCESS, review };
}

//async calls
export function loadReviews() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return reviewApi
      .getReviews()
      .then((reviews) => {
        dispatch(loadReviewSuccess(reviews));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

//save
export function saveReview(review) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return reviewApi
      .saveReview(review)
      .then((savedReview) => {
        review.id
          ? dispatch(updateReviewSuccess(savedReview))
          : dispatch(createReviewSuccess(savedReview));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
