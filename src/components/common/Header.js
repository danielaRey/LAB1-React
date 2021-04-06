import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/carrito" activeStyle={activeStyle}>
        Carrito
      </NavLink>
      {" | "}
      <NavLink to="/crear-cuenta" activeStyle={activeStyle}>
        Crear Cuenta
      </NavLink>
      {" | "}
      <NavLink to="/tours" activeStyle={activeStyle}>
        Tours
      </NavLink>
    </nav>
  );
};

export default Header;
