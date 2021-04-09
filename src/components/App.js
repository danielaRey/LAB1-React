import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
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
        backgroundColor: "wheat",
      }}
    >
      <Header token={jsonToken} />
      <Switch>
        <Route exact path="/" component={ToursPageSearch} />
        <Route path="/about" component={AboutPage} />
        <Route path="/tours/search" component={ToursPageSearch} />
        <Route path="/tours/:pais/:ida/:vuelta" component={TourCardManage} />
        <Route path="/tours" component={ToursPage} />
        <Route path="/tour/details/:id" component={TourDetailsManage} />
        <Route path="/tour/:id" component={ManageTourPage} />
        <Route path="/tour" component={ManageTourPage} />
        <Route path="/login" component={() => <Login token={jsonToken} />} />
        <Route
          path="/crear-cuenta"
          component={() => <ManageCrearCuenta token={jsonToken} />}
        />
        <Route
          path="/carrito"
          component={() => <ManageCarrito token={jsonToken} />}
        />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
