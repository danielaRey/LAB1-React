import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const FotoForm = ({ foto, onSave, onChange, saving = false, errors = {} }) => {
  return (
    <form onSubmit={onSave}>
      <h2>Agregar Fotos</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}

      <label>Nombre</label>
      <br></br>
      <select
        name="nombre"
        value={foto.nombre}
        onChange={onChange}
        className="p-1 mb-1"
      >
        <option value="">Seleccione un valor</option>
        <option value="principal">Principal</option>
        <option value="carousel">Carousel</option>
      </select>

      <TextInput
        name="imagen"
        label="Imagen"
        typeInput="file"
        value={foto.imagen}
        onChange={onChange}
        error={errors.imagen}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
};

FotoForm.propTypes = {
  //authors: PropTypes.array.isRequired,
  tour: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default FotoForm;
