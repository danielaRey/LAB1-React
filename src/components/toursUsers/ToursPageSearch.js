import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as tourActions from "../../redux/actions/tourActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import TourList from "./TourListCard";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import SearchBar from "./SearchBar";

function ToursPageSearch(props) {
  useEffect(() => {
    props.actions.loadTours().catch((err) => {
      alert("loading tours failed" + err);
    });
  }, [props.tour]);

  return (
    <>
      <h2>Tours</h2>
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          <button
            style={{ marginBottom: 20 }}
            className="btn btn-primary add-tour"
          >
            Buscar Tour
          </button>

          <TourList tours={props.tours}></TourList>
        </>
      )}
    </>
  );
}

ToursPageSearch.propTypes = {
  tours: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

//what part pf the state is passed to our components via props
function mapStateToProps(state) {
  return {
    tours: state.tours,
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
