import React from "react";
import { connect } from "react-redux";
import * as tourActions from "../../redux/actions/tourActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import TourList from "./TourList";
import { Redirect } from "react-router-dom";

class ToursPage extends React.Component {
  state = {
    redirectToAddTourPage: false,
  };
  componentDidMount() {
    //stop calling api every load
    //if (this.props.tours.length ===0 ){}
    this.props.actions.loadTours().catch((err) => {
      alert("loading tours failed" + err);
    });
  }
  render() {
    return (
      <>
        {this.state.redirectToAddTourPage && <Redirect to="/tour" />}
        <h2>Tours</h2>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-tour"
          onClick={() => this.setState({ redirectToAddTourPage: true })}
        >
          Agregar Tour
        </button>

        <TourList tours={this.props.tours}></TourList>
      </>
    );
  }
}

ToursPage.propTypes = {
  tours: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

//what part pf the state is passed to our components via props
function mapStateToProps(state) {
  return {
    tours: state.tours,
  };
}

//what actions we want to expose in our components via props
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(tourActions, dispatch),
  };
}

//two functions call
export default connect(mapStateToProps, mapDispatchToProps)(ToursPage);
