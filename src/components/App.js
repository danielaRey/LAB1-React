import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import ToursPage from "./tours/ToursPage";
import ToursPageSearch from "./toursUsers/ToursPageSearch";
import ManageTourPage from "./tours/ManageTourPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TourListCard from "./toursUsers/TourListCard";
import TourCardManage from "./toursUsers/TourCardManage";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/tours/search" component={ToursPageSearch} />
        <Route path="/tours-card" component={TourListCard} />
        <Route path="/tours/:pais/:ida/:vuelta" component={TourCardManage} />
        <Route path="/tours" component={ToursPage} />
        <Route path="/tour/:id" component={ManageTourPage} />
        <Route path="/tour" component={ManageTourPage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
