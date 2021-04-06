import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { saveReservacion } from "../../../redux/actions/reservacionActions";
import PropTypes from "prop-types";
import { newReservacion } from "../../../../models/tourModel";
import { toast } from "react-toastify";
import { loadTours } from "../../../redux/actions/tourActions";

function ManageCarrito({ saveReservacion, loadTours, ...props }) {
  const [reservacion, setReservacion] = useState(newReservacion);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (props.tours.length === 0) {
      loadTours().catch((err) => {
        alert("loading tours failed" + err);
      });
    }
  }, [props.tours]);

  function handleSave(event) {
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
  const STORAGE_NAME = "reservacionTour-222"; //+ clienteIdentificacion;
  let reservacionLocal = localStorage.getItem(STORAGE_NAME);
  let jsonReservacion = JSON.parse(reservacionLocal);
  debugger;
  //falta ver las sessiones, que mostrar
  // errors={errors}
  // onSave={handleSave}
  // saving={saving}
  // reservacion={reservacion}

  //tour nombre
  //cantidad
  //precio
  //total

  let t = props.tours;
  function getTourByID(tours, id) {
    let s = tours.find((tour) => tour.id.toString() === id) || null;
    return tours.find((tour) => tour.id.toString() === id.toString()) || null;
  }
  //{getTourByID(props.tours, reservacion.tourID).nombre}
  return (
    <>
      <p>hola 2</p>
      <ul>
        {props.tours.length > 0 ? (
          jsonReservacion.map((reservacion) => {
            return (
              <li key={reservacion.cantidad}>
                {getTourByID(props.tours, reservacion.tourID).nombre}
              </li>
            );
          })
        ) : (
          <p></p>
        )}
      </ul>
    </>
  );
}

ManageCarrito.propTypes = {
  tours: PropTypes.array.isRequired,
  reservacion: PropTypes.object,
  saveReservacion: PropTypes.func.isRequired,
  loadTours: PropTypes.func.isRequired,
};

//what part pf the state is passed to our components via props
function mapStateToProps(state, ownProps) {
  return {
    tours: state.tours,
    loading: state.apiCallsInProgress > 0,
  };
}

//what actions we want to expose in our components via props
const mapDispatchToProps = {
  loadTours,
  saveReservacion,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCarrito);
