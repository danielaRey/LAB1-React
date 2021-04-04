import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadTours } from "../../../redux/actions/tourActions";
import { loadFotos } from "../../../redux/actions/fotoActions";
import { loadReviews } from "../../../redux/actions/reviewActions";
import { loadClientes } from "../../../redux/actions/clienteActions";
import PropTypes from "prop-types";
import TourDetails from "./TourDetails";
import "react-datepicker/dist/react-datepicker.css";
import { newTour } from "../../../../models/tourModel";

function TourCardManage({
  loadTours,
  loadFotos,
  loadReviews,
  loadClientes,
  ...props
}) {
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

    if (props.clientes.length === 0) {
      loadClientes().catch((err) => {
        alert("loading clients failed" + err);
      });
    }
  }, [props.foto]);

  const filterFotos = props.fotos.filter(
    (foto) => foto.tourID.toString() === props.match.params.id
  );

  const filterReviews = props.reviews.filter(
    (review) => review.tourID.toString() === props.match.params.id
  );

  return (
    <>
      <TourDetails
        fotos={filterFotos}
        reviews={filterReviews}
        tour={props.tour}
      ></TourDetails>
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
  loadClientes: PropTypes.func.isRequired,
};

export function getTourByID(tours, id) {
  return tours.find((tour) => tour.id.toString() === id) || null;
}

//what part pf the state is passed to our components via props
function mapStateToProps(state, ownProps) {
  const tourID = ownProps.match.params.id;
  const tour =
    tourID && state.tours.length > 0
      ? getTourByID(state.tours, tourID)
      : newTour;
  debugger;
  return {
    reviews:
      state.clientes.length === 0
        ? []
        : state.reviews.map((review) => {
            return {
              ...review,
              clienteNombre:
                state.clientes.find(
                  (c) => c.identificacion === review.clienteIdentificacion
                ).nombre +
                " " +
                state.clientes.find(
                  (c) => c.identificacion === review.clienteIdentificacion
                ).apellidos,
            };
          }),
    clientes: state.clientes,
    fotos: state.fotos,
    tours: state.tours,
    tour,
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
  loadClientes,
  //actions: bindActionCreators(tourActions, dispatch),
};

//two functions call
export default connect(mapStateToProps, mapDispatchToProps)(TourCardManage);
