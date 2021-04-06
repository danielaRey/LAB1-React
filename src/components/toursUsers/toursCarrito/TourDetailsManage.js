import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadTours } from "../../../redux/actions/tourActions";
import { loadFotos } from "../../../redux/actions/fotoActions";
import { loadReviews } from "../../../redux/actions/reviewActions";
import { loadClientes } from "../../../redux/actions/clienteActions";
import { saveReservacion } from "../../../redux/actions/reservacionActions";
import PropTypes from "prop-types";
import TourDetails from "./TourDetails";
import "react-datepicker/dist/react-datepicker.css";
import { newTour, newReservacion } from "../../../../models/tourModel";
import { toast } from "react-toastify";

function TourCardManage({
  loadTours,
  loadFotos,
  loadReviews,
  loadClientes,
  saveReservacion,
  ...props
}) {
  const [reservacion, setReservacion] = useState(newReservacion);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

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
  }, [props.reservacion]);

  const filterFotos = props.fotos.filter(
    (foto) => foto.tourID.toString() === props.match.params.id
  );

  const filterReviews = props.reviews.filter(
    (review) => review.tourID.toString() === props.match.params.id
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setReservacion((prevReservacion) => ({
      ...prevReservacion,
      [name]: value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    debugger;
    let json = JSON.parse(localStorage.getItem("tokenmovt"));
    const correo = json["token"];
    const clienteIdentificacion =
      props.clientes.find((cliente) => cliente.usuarioCorreo === correo)
        .identificacion || "";

    const STORAGE_NAME = "reservacionTour-" + clienteIdentificacion;

    const reservacionTemp = newReservacion;
    reservacionTemp["clienteIdentificacion"] = clienteIdentificacion;
    reservacionTemp["tourID"] = props.tour.id;
    reservacionTemp["cantidad"] = reservacion.cantidad;
    setSaving(true);

    let reservacionArray = [];
    let reservacionLocal = localStorage.getItem(STORAGE_NAME);
    if (reservacionLocal) {
      let jsonReservacion = JSON.parse(reservacionLocal);
      //localStorage.removeItem("reservacionTour");
      debugger;
      for (var i = 0; i < jsonReservacion.length; i++) {
        reservacionArray.push(jsonReservacion[i]);
      }
      reservacionArray.push(reservacionTemp);
      localStorage.setItem(STORAGE_NAME, JSON.stringify(reservacionArray));
    } else {
      reservacionArray.push(reservacionTemp);
      localStorage.setItem(STORAGE_NAME, JSON.stringify(reservacionArray));
    }

    toast.success("Reservación guardado.");
    setSaving(false);

    // setReservacion((prevReservacion) => ({
    //   ...prevReservacion,
    //   ["tourID"]: props.tour.id,
    //   ["clienteIdentificacion"]: clienteIdentificacion,
    //   ["test"]: 2,
    // }));

    // saveReservacion(reservacion)
    //   .then(() => {
    //     toast.success("Reservación guardado.");
    //     history.push("/");
    //   })
    //   .catch((error) => {
    //     setSaving(false);
    //     setErrors({ onSave: error.message });
    //   });
  }
  debugger;
  return (
    <>
      <TourDetails
        fotos={filterFotos}
        reviews={filterReviews}
        tour={props.tour}
        errors={errors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
        reservacion={reservacion}
      ></TourDetails>
    </>
  );
}

TourCardManage.propTypes = {
  reviews: PropTypes.array.isRequired,
  reservacion: PropTypes.object,
  tours: PropTypes.array.isRequired,
  fotos: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadTours: PropTypes.func.isRequired,
  loadFotos: PropTypes.func.isRequired,
  loadReviews: PropTypes.func.isRequired,
  loadClientes: PropTypes.func.isRequired,
  saveReservacion: PropTypes.func.isRequired,
};

export function getTourByID(tours, id) {
  return tours.find((tour) => tour.id.toString() === id) || null;
}

export function getClienteByID(clientes) {
  let json = JSON.parse(localStorage.getItem("tokenmovt"));
  const correo = json["token"];
  return clientes.find((cliente) => cliente.usuarioCorreo === correo) || null;
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
  };
}

//what actions we want to expose in our components via props
const mapDispatchToProps = {
  loadTours,
  loadFotos,
  loadReviews,
  loadClientes,
  saveReservacion,
};

export default connect(mapStateToProps, mapDispatchToProps)(TourCardManage);
