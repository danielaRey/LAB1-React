import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import SearchNotFound from "./SearchNotFound";
import ToursPage from "./tours/ToursPage";
import ToursPageSearch from "./toursUsers/ToursPageSearch";
import ManageTourPage from "./tours/ManageTourPage";
import TourDetailsManage from "./toursUsers/toursCarrito/TourDetailsManage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TourCardManage from "./toursUsers/TourCardManage";
import ManageCrearCuenta from "./login/ManageCrearCuenta";
import ManageCarrito from "./toursUsers/toursCarrito/ManageCarrito";
import Login from "./login/Login";
import ManageFotos from "./fotos/ManageFotos";

function App() {
  const STORAGE_NAME = "tokenmovt";
  let stringToken = localStorage.getItem(STORAGE_NAME);
  let jsonToken = null;
  if (stringToken) {
    jsonToken = JSON.parse(stringToken);
  }
  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#A7C1E8",
        padding: "10px",
      }}
    >
      <Header token={jsonToken} />
      <Switch>
        <Route exact path="/" component={ToursPageSearch} />
        <Route path="/about" component={AboutPage} />
        <Route path="/tours/search" component={ToursPageSearch} />
        <Route path="/tours/:pais/:ida/:vuelta" component={TourCardManage} />

        <Route
          exact
          path="/tours"
          render={(props) => <ToursPage {...props} token={jsonToken} />}
        />

        <Route path="/tours" component={SearchNotFound} />
        <Route path="/tour/details/:id" component={TourDetailsManage} />

        <Route
          path="/tour/:id"
          render={(props) => <ManageTourPage {...props} token={jsonToken} />}
        />
        <Route
          path="/tour"
          render={(props) => <ManageTourPage {...props} token={jsonToken} />}
        />

        <Route path="/login" component={() => <Login token={jsonToken} />} />
        <Route
          path="/crear-cuenta"
          render={(props) => <ManageCrearCuenta {...props} token={jsonToken} />}
        />

        <Route
          path="/carrito"
          render={(props) => <ManageCarrito {...props} token={jsonToken} />}
        />

        <Route
          path="/fotos/:id"
          render={(props) => <ManageFotos {...props} token={jsonToken} />}
        />

        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
