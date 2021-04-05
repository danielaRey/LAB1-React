import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CrearCuenta from "./CrearCuenta";
import { newCliente, newUsuario } from "../../../models/tourModel";
import { toast } from "react-toastify";
import { saveCliente } from "../../redux/actions/clienteActions";
import { saveUsuario } from "../../redux/actions/usuarioActions";

function ManageCrearCuenta({
  loadClientes,
  saveCliente,
  saveUsuario,
  ...props
}) {
  const [cliente, setCliente] = useState(newCliente);
  const [usuario, setUsuario] = useState(newUsuario);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));

    if (name === "correo") {
      setCliente((prevCliente) => ({
        ...prevCliente,
        ["usuarioCorreo"]: value,
      }));
    } else {
      setCliente((prevCliente) => ({
        ...prevCliente,
        [name]: value,
      }));
    }
  }

  function formIsValid() {
    // const { nombre, categoria } = tour;
    // const errors = {};
    // if (!nombre) errors.nombre = "Nombre es requerido";
    // if (!categoria) errors.categoria = "Categoría es requerida.";
    // setErrors(errors);
    // // Form is valid if the errors object still has no properties
    // return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    const usuarioCorreo = usuario.correo;
    //if (!formIsValid()) return;
    setSaving(true);
    saveUsuario(usuario)
      .then(() => {
        saveCliente(cliente)
          .then(() => {
            toast.success("Cuenta registrada exitosamente.");
            props.history.push("/");
          })
          .catch((error) => {
            setSaving(false);
            setErrors({ onSave: error.message });
          });
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  debugger;
  return (
    <>
      <CrearCuenta
        errors={errors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
        cliente={cliente}
        usuario={usuario}
      ></CrearCuenta>
    </>
  );
}

ManageCrearCuenta.propTypes = {
  reservacion: PropTypes.object,
  saveCliente: PropTypes.func.isRequired,
  saveUsuario: PropTypes.func.isRequired,
};

//what part pf the state is passed to our components via props
function mapStateToProps(state, ownProps) {
  // return {
  //   cliente,
  // };
}

//what actions we want to expose in our components via props
const mapDispatchToProps = {
  saveCliente,
  saveUsuario,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCrearCuenta);
