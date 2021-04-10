import React, { useState } from "react";
import PropTypes from "prop-types";
import { handleResponse, handleError } from "../../api/apiUtils";
import { Redirect } from "react-router-dom";

export default function Login(props) {
  const [correo, setCorreo] = useState();
  const [password, setPassword] = useState();

  function refreshPage() {
    //window.location.reload();
  }

  function loginUser(credentials) {
    console.log(credentials);
    return fetch("http://localhost:4000/api/login", {
      method: "POST", // POST for create, PUT to update when id already exists.
      headers: { "content-type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((data) => {
        debugger;
        let a = data.responseText;
        data.json().then((obj) => {
          const stringToken = JSON.stringify(obj);
          localStorage.setItem("tokenmovt", stringToken);
          location.reload();
          props.history.push("/tours/search");
          return false;
          //localStorage.setItem("tokenmovt", obj);
        });
      })
      .catch(handleError);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser({
      correo,
      password,
    });
    //props.history.push("/");
  };

  return (
    <>
      {props.token ? (
        <Redirect to="/" />
      ) : (
        <div className="login-wrapper">
          <h1>Iniciar sesión</h1>
          <form onSubmit={handleSubmit}>
            <label style={{ margin: "8px" }}>
              <p>Correo</p>
              <input type="text" onChange={(e) => setCorreo(e.target.value)} />
            </label>
            <label style={{ margin: "8px" }}>
              <p>Password</p>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div>
              <button
                style={{ marginLeft: "8px" }}
                className="btn btn-primary "
                type="submit"
                onClick={refreshPage}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
