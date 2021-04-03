import { handleResponse, handleError } from "./apiUtils";

export function getFavoritos() {
  const baseUrl = process.env.API_URL + "/api/favorito/list/";
  console.log(baseUrl);
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveFavorito(favorito) {
  const baseUrl = process.env.API_URL + "/api/favorito/create";
  return fetch(baseUrl, {
    method: "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(favorito),
  })
    .then(handleResponse)
    .catch(handleError);
}
