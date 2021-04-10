import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadTours } from "../../redux/actions/tourActions";
import { loadFotos } from "../../redux/actions/fotoActions";
import { loadReviews } from "../../redux/actions/reviewActions";
import PropTypes from "prop-types";
import TourList from "./TourListCard";
import "react-datepicker/dist/react-datepicker.css";
import { NavLink } from "react-router-dom";

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
  }, [props.tours]);

  return (
    <>
      {props.tours.length > 0 ? (
        <TourList
          tours={props.tours}
          fotos={props.fotos}
          reviews={props.reviews}
        ></TourList>
      ) : (
        <>
          <p>No se encontro ningún tour con esos criterios.</p>
          <NavLink to="/" className="btn btn-primary">
            Regresar
          </NavLink>
        </>
      )}
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

  const idaParam = ownProps.match.params.ida;
  const ida =
    idaParam !== "undefined"
      ? new Date(idaParam).toISOString().substr(0, 10).replace(/-/g, "-")
      : "";

  const vueltaParam = ownProps.match.params.vuelta;
  const vuelta =
    vueltaParam !== "undefined"
      ? new Date(vueltaParam).toISOString().substr(0, 10).replace(/-/g, "-")
      : "";

  const filtered = state.tours.filter((tour) => {
    if (tour.pais) {
      return (
        tour.pais.toLowerCase().includes(pais.toLowerCase()) ||
        tour.fechaIda === ida ||
        tour.fechaVuelta === vuelta
      );
    }
  });

  return {
    reviews: state.reviews,
    fotos: state.fotos,
    tours: filtered,
    loading: state.apiCallsInProgress > 0,
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
