import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { saveReservacion } from "../../../redux/actions/reservacionActions";
import PropTypes from "prop-types";
import { newReservacion } from "../../../../models/tourModel";
import { toast } from "react-toastify";
import { loadTours } from "../../../redux/actions/tourActions";

function ManageCarrito({ saveReservacion, loadTours, history, ...props }) {
  const [reservacion, setReservacion] = useState(newReservacion);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (props.tours.length === 0) {
      loadTours().catch((err) => {
        alert("loading tours failed" + err);
      });
    }
  }, [props.tours]);

  const STORAGE_NAME = "reservacionTour-222"; //+ clienteIdentificacion;
  let reservacionLocal = localStorage.getItem(STORAGE_NAME);
  let jsonReservacion = null;
  if (reservacionLocal) {
    jsonReservacion = JSON.parse(reservacionLocal);
  }
  //falta ver las sessiones, que mostrar
  // errors={errors}
  // onSave={handleSave}
  // saving={saving}
  // reservacion={reservacion}

  //tour nombre
  //cantidad
  //precio
  //total

  function getTourByID(tours, id) {
    let s = tours.find((tour) => tour.id.toString() === id) || null;
    return tours.find((tour) => tour.id.toString() === id.toString()) || null;
  }

  function calcularTotal() {
    let total = 0;
    if (props.tours.length > 0 && jsonReservacion) {
      jsonReservacion.map((reservacion) => {
        total =
          total +
          reservacion.cantidad *
            getTourByID(props.tours, reservacion.tourID).precio;
      });
      return total;
    }
    return 0;
  }

  function handleSave() {
    debugger;
    setSaving(true);
    let flag = true;
    jsonReservacion.map((reservacion) => {
      saveReservacion(reservacion)
        .then(() => {
          if (flag) {
            toast.success("Reservación guardado.");
            history.push("/tours/search");
            flag = false;
          }
        })
        .catch((error) => {
          setSaving(false);
          setErrors({ onSave: error.message });
        });
    });
  }

  function limpiarCarrito() {
    if (reservacionLocal) {
      localStorage.removeItem(STORAGE_NAME);
    }
  }

  let f = false;
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Tour</th>
            <th>Cantidad</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {props.tours.length > 0 && jsonReservacion ? (
            jsonReservacion.map((reservacion) => {
              return (
                <tr key={getTourByID(props.tours, reservacion.tourID).id}>
                  <td>{getTourByID(props.tours, reservacion.tourID).nombre}</td>
                  <td>{reservacion.cantidad}</td>
                  <td>
                    {getTourByID(props.tours, reservacion.tourID).precio *
                      reservacion.cantidad}
                  </td>
                </tr>
              );
            })
          ) : (
            <></>
          )}
          <tr>
            <td>Comisión(5%)</td>
            <td>&nbsp;</td>
            <td>{calcularTotal() * 0.05}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>&nbsp;</td>
            <td>{calcularTotal() + calcularTotal() * 0.05}</td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
      <button
        type="submit"
        onClick={() => {
          handleSave();
        }}
        className="btn btn-primary"
      >
        {saving ? "Guardando..." : "Confirmar Compra"}
      </button>

      <button
        type="submit"
        onClick={() => {
          limpiarCarrito();
        }}
        className="btn btn-primary"
      >
        Limpiar carrito
      </button>
    </>
  );
}

ManageCarrito.propTypes = {
  tours: PropTypes.array.isRequired,
  reservacion: PropTypes.object,
  saveReservacion: PropTypes.func.isRequired,
  loadTours: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
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
