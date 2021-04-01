import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import CoursesPage from "./courses/CoursesPage";
import ToursPage from "./tours/ToursPage";
import ManageTourPage from "./tours/ManageTourPage";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/tours" component={ToursPage} />
        <Route path="/tour/:slug" component={ManageTourPage} />
        <Route path="/tour" component={ManageTourPage} />

        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
