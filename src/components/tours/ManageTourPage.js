import React from "react";
import { connect } from "react-redux";
import * as tourActions from "../../redux/actions/tourActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class ManageTourPage extends React.Component {
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
        <h2>Administración Tour</h2>
      </>
    );
  }
}

ManageTourPage.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(ManageTourPage);
