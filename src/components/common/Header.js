import React from "react";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  const activeStyle = { color: "#F15B2A", cursor: "pointer" };
  const STORAGE_NAME = "tokenmovt";

  function logout() {
    if (props.token) {
      localStorage.removeItem(STORAGE_NAME);
      location.reload();
      props.history.push("/tours/search");
      return false;
    }
  }

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
      {props.token ? (
        <NavLink
          to="/"
          activeStyle={activeStyle}
          onClick={() => {
            logout();
          }}
        >
          Logout
        </NavLink>
      ) : (
        <>
          <NavLink to="/login" activeStyle={activeStyle}>
            Login
          </NavLink>
          {" | "}
          <NavLink to="/crear-cuenta" activeStyle={activeStyle}>
            Crear Cuenta
          </NavLink>
        </>
      )}
      {" | "}
      <NavLink to="/tours" activeStyle={activeStyle}>
        Tours
      </NavLink>
    </nav>
  );
};

export default Header;
