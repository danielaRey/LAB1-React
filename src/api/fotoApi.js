import { handleResponse, handleError } from "./apiUtils";

export function getFotos() {
  const baseUrl = process.env.API_URL + "/api/foto/list/";
  console.log(baseUrl);
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveFoto(foto) {
  const baseUrl = process.env.API_URL + "/api/foto/create";
  return fetch(baseUrl, {
    method: "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(foto),
  })
    .then(handleResponse)
    .catch(handleError);
}
