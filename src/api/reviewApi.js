import { handleResponse, handleError } from "./apiUtils";

export function getReviews() {
  const baseUrl = process.env.API_URL + "/api/review/list/";
  console.log(baseUrl);
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveReview(review) {
  const baseUrl = process.env.API_URL + "/api/review/create";
  return fetch(baseUrl, {
    method: "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(review),
  })
    .then(handleResponse)
    .catch(handleError);
}
