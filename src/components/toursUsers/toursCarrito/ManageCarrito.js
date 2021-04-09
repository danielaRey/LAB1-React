import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { saveReservacion } from "../../../redux/actions/reservacionActions";
import PropTypes from "prop-types";
import { newReservacion } from "../../../../models/tourModel";
import { toast } from "react-toastify";
import { loadTours } from "../../../redux/actions/tourActions";
import { loadClientes } from "../../../redux/actions/clienteActions";
import TableCarrito from "./TableCarrito";

function ManageCarrito({
  saveReservacion,
  loadTours,
  loadClientes,
  history,
  ...props
}) {
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

    if (props.clientes.length === 0) {
      loadClientes().catch((err) => {
        alert("loading clientes failed" + err);
      });
    }
  }, [props.tours]);

  const STORAGE_NAME = "reservacionTour"; //+ clienteIdentificacion;
  let reservacionLocal = localStorage.getItem(STORAGE_NAME);
  let jsonReservacion = null;
  let clienteIdentificacion = 0;
  if (reservacionLocal) {
    if (props.token && props.clientes.length > 0) {
      const correo = props.token["token"];
      clienteIdentificacion =
        props.clientes.find((cliente) => cliente.usuarioCorreo === correo)
          .identificacion || "";
    }
    debugger;

    jsonReservacion = JSON.parse(reservacionLocal);
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
      location.reload();
      return false;
    }
  }

  return (
    <>
      {props.tours.length > 0 && jsonReservacion ? (
        <TableCarrito
          reservaciones={jsonReservacion}
          tours={props.tours}
          saving={saving}
          handleSave={handleSave}
          limpiarCarrito={limpiarCarrito}
        ></TableCarrito>
      ) : (
        <p>Carrito Vacio!</p>
      )}
    </>
  );
}

ManageCarrito.propTypes = {
  tours: PropTypes.array.isRequired,
  clientes: PropTypes.array.isRequired,
  reservacion: PropTypes.object,
  saveReservacion: PropTypes.func.isRequired,
  loadTours: PropTypes.func.isRequired,
  loadClientes: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

//what part pf the state is passed to our components via props
function mapStateToProps(state, ownProps) {
  return {
    tours: state.tours,
    clientes: state.clientes,
    loading: state.apiCallsInProgress > 0,
  };
}

//what actions we want to expose in our components via props
const mapDispatchToProps = {
  loadTours,
  loadClientes,
  saveReservacion,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCarrito);
