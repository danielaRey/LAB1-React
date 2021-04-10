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
    const {
      identificacion,
      nombre,
      apellidos,
      pais,
      correo,
      password,
    } = cliente;
    const errors = {};
    let passworErrors = "";
    debugger;
    if (!identificacion) errors.identificacion = "Identificación es requerida";
    if (!nombre) errors.nombre = "Nombre es requerido.";
    if (!apellidos) errors.apellidos = "Apellido es requerido";
    if (!correo) errors.correo = "Correo es requerido.";
    if (!password) {
      passworErrors = "Contraseña es requerida.";
    } else {
      if (password.length < 8) {
        passworErrors =
          passworErrors + "Contraseña debe ser de mínimo 8 dígitos.";
      }
      if (!/\d/.test(password)) {
        passworErrors =
          passworErrors + "Contraseña debe contar al menos un número.";
      }
      if (!/(?=.*[A-Z])(?=.*[a-z])/.test(password)) {
        passworErrors =
          passworErrors +
          "Contraseña debe tener una letra mayúscula y minúscula.";
      }
      if (!/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])/.test(password)) {
        passworErrors =
          passworErrors + "Contraseña debe tener un carácter especial.";
      }
    }
    ///^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/

    errors.password = passworErrors;

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
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
      {!props.token ? (
        <CrearCuenta
          errors={errors}
          onChange={handleChange}
          onSave={handleSave}
          saving={saving}
          cliente={cliente}
          usuario={usuario}
        ></CrearCuenta>
      ) : (
        <p>Usuario ya esta logeado</p>
      )}
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
