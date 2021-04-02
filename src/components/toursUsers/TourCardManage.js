import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as tourActions from "../../redux/actions/tourActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import TourList from "./TourListCard";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ToursPageSearch(props) {
  const [input, setInput] = useState("");
  const [countryListFilter, setCountryListDefault] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [flagVisibleTours, setFlagVisibleTours] = useState(false);

  useEffect(() => {
    props.actions.loadTours().catch((err) => {
      alert("loading tours failed" + err);
    });
  }, [props.tour]);

  const updateInput = async (input) => {
    // const filtered = props.tours.filter((tour) => {
    //   return tour.nombre.toLowerCase().includes(input.toLowerCase());
    // });
    setInput(input);
    //setCountryListDefault(filtered);
  };

  function search(event) {
    const filtered = props.tours.filter((tour) => {
      return tour.nombre.toLowerCase().includes(input.toLowerCase());
    });
    debugger;
    setFlagVisibleTours(true);
    setCountryListDefault(filtered);
  }

  function handleSelect(date) {
    console.log(date); // native Date object
  }

  return (
    <>
      <TourList tours={props.tours}></TourList>
    </>
  );
}

ToursPageSearch.propTypes = {
  tours: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

//what part pf the state is passed to our components via props
function mapStateToProps(state, ownProps) {
  const pais = ownProps.match.params.pais;
  const ida = ownProps.match.params.ida;
  const vuelta = ownProps.match.params.vuelta;
  const filtered = state.tours.filter((tour) => {
    return tour.nombre.toLowerCase().includes(pais.toLowerCase());
  });
  debugger;
  //state.tours,
  return {
    tours: filtered,
    loading: state.apiCallsInProgress > 0,
  };
}

//what actions we want to expose in our components via props
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(tourActions, dispatch),
  };
}

//two functions call
export default connect(mapStateToProps, mapDispatchToProps)(ToursPageSearch);
