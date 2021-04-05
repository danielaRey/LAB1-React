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
import Login from "./login/Login";

function App() {
  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "wheat",
      }}
    >
      <Header />
      <Switch>
        <Route exact path="/" component={ToursPageSearch} />
        <Route path="/about" component={AboutPage} />
        <Route path="/tours/search" component={ToursPageSearch} />
        <Route path="/tours/:pais/:ida/:vuelta" component={TourCardManage} />
        <Route path="/tours" component={ToursPage} />
        <Route path="/tour/details/:id" component={TourDetailsManage} />
        <Route path="/tour/:id" component={ManageTourPage} />
        <Route path="/tour" component={ManageTourPage} />
        <Route path="/login" component={Login} />
        <Route path="/crear-cuenta" component={ManageCrearCuenta} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
