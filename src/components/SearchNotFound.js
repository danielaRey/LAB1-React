import React from "react";
import { NavLink } from "react-router-dom";

const activeStyle = {
  backgroundColor: "#4A6DA2",
  padding: "30px",
};

const SearchNotFound = (props) => (
  <>
    <h1>No se encontro ningún resultado con esos criterios.</h1>
    <NavLink to="/" className="btn btn-primary">
      Regresar
    </NavLink>
  </>
);

export default SearchNotFound;
