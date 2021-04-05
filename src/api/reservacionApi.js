import { handleResponse, handleError } from "./apiUtils";

export function getReservaciones() {
  const baseUrl = process.env.API_URL + "/api/reservacion/list/";
  console.log(baseUrl);
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveReservacion(reservacion) {
  const baseUrl = process.env.API_URL + "/api/reservacion/create";
  return fetch(baseUrl, {
    method: "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(reservacion),
  })
    .then(handleResponse)
    .catch(handleError);
}
