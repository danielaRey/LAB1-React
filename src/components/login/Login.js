import React, { useState } from "react";
import PropTypes from "prop-types";
import { handleResponse, handleError } from "../../api/apiUtils";
import { Redirect } from "react-router-dom";

export default function Login() {
  const [correo, setCorreo] = useState();
  const [password, setPassword] = useState();

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
          localStorage.setItem("tokenmovt", obj);
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
  };

  const tokenExists = localStorage.getItem("tokenmovt");
  return (
    <>
      {tokenExists ? (
        <Redirect to="/" />
      ) : (
        <div className="login-wrapper">
          <h1>Please Log In</h1>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Username</p>
              <input type="text" onChange={(e) => setCorreo(e.target.value)} />
            </label>
            <label>
              <p>Password</p>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
