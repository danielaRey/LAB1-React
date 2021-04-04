import { handleResponse, handleError } from "./apiUtils";

export function getClientes() {
  const baseUrl = process.env.API_URL + "/api/cliente/list/";
  console.log(baseUrl);
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveCliente(cliente) {
  const baseUrl = process.env.API_URL + "/api/cliente/create";
  return fetch(baseUrl, {
    method: "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(cliente),
  })
    .then(handleResponse)
    .catch(handleError);
}
