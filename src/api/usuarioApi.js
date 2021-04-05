import { handleResponse, handleError } from "./apiUtils";

export function saveUsuario(usuario) {
  const baseUrl = process.env.API_URL + "/api/usuario/create";
  return fetch(baseUrl, {
    method: "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(usuario),
  })
    .then(handleResponse)
    .catch(handleError);
}
