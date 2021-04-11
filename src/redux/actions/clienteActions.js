import * as types from "./actionTypes";
import * as clienteApi from "../../api/clienteApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadClienteSuccess(clientes) {
  return { type: types.LOAD_CLIENTES_SUCCESS, clientes };
}

export function loadClienteCorreoSuccess(cliente) {
  return { type: types.LOAD_CLIENTE_SUCCESS, cliente };
}

export function updateClienteSuccess(cliente) {
  return { type: types.UPDATE_CLIENTE_SUCCESS, cliente };
}

export function createClienteSuccess(cliente) {
  return { type: types.CREATE_CLIENTE_SUCCESS, cliente };
}

//async calls
export function loadClienteCorreo(correo) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return clienteApi
      .getCliente(correo)
      .then((cliente) => {
        dispatch(loadClienteCorreoSuccess(cliente));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

//async calls
export function loadClientes() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return clienteApi
      .getClientes()
      .then((clientes) => {
        dispatch(loadClienteSuccess(clientes));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

//save
//cliente id?
export function saveCliente(cliente) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return clienteApi
      .saveCliente(cliente)
      .then((savedCliente) => {
        cliente.id
          ? dispatch(updateClienteSuccess(savedCliente))
          : dispatch(createClienteSuccess(savedCliente));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
