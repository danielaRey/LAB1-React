import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const CrearCuenta = ({
  cliente,
  onSave,
  onChange,
  usuario,
  saving = false,
  errors = {},
}) => {
  debugger;
  return (
    <form onSubmit={onSave}>
      <h2>Crear cuenta</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="identificacion"
        label="Identificación"
        value={cliente.identificacion}
        onChange={onChange}
        error={errors.identificacion}
      />

      <TextInput
        name="nombre"
        label="Nombre"
        value={cliente.nombre}
        onChange={onChange}
        error={errors.nombre}
      />

      <TextInput
        name="apellidos"
        label="Apellidos"
        value={cliente.apellidos}
        onChange={onChange}
        error={errors.apellidos}
      />

      <TextInput
        name="pais"
        label="País"
        value={cliente.pais}
        onChange={onChange}
        error={errors.pais}
      />

      <TextInput
        name="fechaNacimiento"
        label="Fecha de Nacimiento"
        typeInput="date"
        value={cliente.fechaNacimiento}
        onChange={onChange}
        error={errors.fechaNacimiento}
      />

      <TextInput
        name="correo"
        label="Correo"
        typeInput="email"
        value={usuario.correo}
        onChange={onChange}
        error={errors.correo}
      />

      <TextInput
        name="password"
        label="Contraseña"
        typeInput="password"
        value={usuario.password}
        onChange={onChange}
        error={errors.password}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
};

CrearCuenta.propTypes = {
  cliente: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default CrearCuenta;
