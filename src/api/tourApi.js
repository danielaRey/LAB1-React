import { handleResponse, handleError } from "./apiUtils";

export function getTours() {
  const baseUrl = process.env.API_URL + "/api/tour/list/";
  console.log(baseUrl);
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

// export function saveTour(tour) {
//   console.log("save tour id: " + tour.id);
//   return fetch("/api/review/create" + (tour.id || ""), {
//     method: tour.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify(tour),
//   })
//     .then(handleResponse)
//     .catch(handleError);
// }

export function saveTour(tour) {
  const baseUrl = process.env.API_URL + "/api/tour/create";
  console.log("save tour id: ");
  return fetch(baseUrl, {
    method: "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(tour),
  })
    .then(handleResponse)
    .catch(handleError);
}

// export function deleteTour(courseId) {
//   return fetch(baseUrl + courseId, { method: "DELETE" })
//     .then(handleResponse)
//     .catch(handleError);
// }
