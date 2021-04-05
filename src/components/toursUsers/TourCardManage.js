import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadTours } from "../../redux/actions/tourActions";
import { loadFotos } from "../../redux/actions/fotoActions";
import { loadReviews } from "../../redux/actions/reviewActions";
import PropTypes from "prop-types";
import TourList from "./TourListCard";
import "react-datepicker/dist/react-datepicker.css";

function TourCardManage({ loadTours, loadFotos, loadReviews, ...props }) {
  const [calificacionEstrellas, setCalificacionEstrellas] = useState(0);
  const [cantidadReviews, setCantidadReviews] = useState(0);

  useEffect(() => {
    if (props.fotos.length === 0) {
      loadFotos().catch((err) => {
        alert("loading fotos failed" + err);
      });
    }

    if (props.reviews.length === 0) {
      loadReviews().catch((err) => {
        alert("loading reviews failed" + err);
      });
    }

    if (props.tours.length === 0) {
      loadTours().catch((err) => {
        alert("loading tours failed" + err);
      });
    }
  }, [props.foto]);

  return (
    <>
      <TourList
        tours={props.tours}
        fotos={props.fotos}
        reviews={props.reviews}
      ></TourList>
    </>
  );
}

TourCardManage.propTypes = {
  reviews: PropTypes.array.isRequired,
  tours: PropTypes.array.isRequired,
  fotos: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadTours: PropTypes.func.isRequired,
  loadFotos: PropTypes.func.isRequired,
  loadReviews: PropTypes.func.isRequired,
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
  // let tours =
  //   state.fotos.length === 0
  //     ? []
  //     : filtered.map((tour) => {
  //         return {
  //           ...tour,
  //           fotoPath: state.fotos.find(
  //             (f) => f.tourID === tour.id && f.nombre === "food lunch"
  //           ).imagen,
  //         };
  //       });
  // if (state.fotos.length === 0) {
  //   console.log("ftoos 0");
  // } else {
  //   console.log("hola como stas");
  // }

  return {
    reviews: state.reviews,
    fotos: state.fotos,
    tours: filtered,
    loading: state.apiCallsInProgress > 0,
    // tours:
    //   state.fotos.length === 0
    //     ? []
    //     : filtered.map((tour) => {
    //         return {
    //           ...tour,
    //           fotoPath: state.fotos.find(
    //             (f) => f.tourID === tour.id && f.nombre === "food lunch"
    //           ).imagen,
    //         };
    //       }),
  };
}

//what actions we want to expose in our components via props
const mapDispatchToProps = {
  loadTours,
  loadFotos,
  loadReviews,
  //actions: bindActionCreators(tourActions, dispatch),
};

//two functions call
export default connect(mapStateToProps, mapDispatchToProps)(TourCardManage);
