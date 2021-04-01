import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const TourForm = ({ tour, onSave, onChange, saving = false, errors = {} }) => {
  return (
    <form onSubmit={onSave}>
      <h2>{tour.id ? "Editar" : "Agregar"} Tour</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="nombre"
        label="Nombre"
        value={tour.nombre}
        onChange={onChange}
        error={errors.nombre}
      />

      <TextInput
        name="categoria"
        label="Categoría"
        value={tour.categoria}
        onChange={onChange}
        error={errors.categoria}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

TourForm.propTypes = {
  //authors: PropTypes.array.isRequired,
  tour: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default TourForm;
