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

      <TextInput
        name="duracion"
        label="Duración"
        value={tour.duracion}
        onChange={onChange}
        error={errors.duracion}
      />

      <TextInput
        name="precio"
        typeInput="number"
        label="Precio"
        value={tour.precio}
        onChange={onChange}
        error={errors.precio}
      />

      <TextInput
        name="pais"
        label="País"
        value={tour.pais}
        onChange={onChange}
        error={errors.pais}
      />

      <TextInput
        name="descripcion"
        label="Descripción"
        value={tour.descripcion}
        onChange={onChange}
        error={errors.descripcion}
      />

      <TextInput
        name="indicacionesGenerales"
        label="Indicaciones Generales"
        value={tour.indicacionesGenerales}
        onChange={onChange}
        error={errors.indicacionesGenerales}
      />

      <TextInput
        name="actividadesIncluidas"
        label="Actividades Incluidas"
        value={tour.actividadesIncluidas}
        onChange={onChange}
        error={errors.actividadesIncluidas}
      />

      <TextInput
        name="actividadesNoIncluidas"
        label="Actividades No Incluidas"
        value={tour.actividadesNoIncluidas}
        onChange={onChange}
        error={errors.actividadesNoIncluidas}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Guardando..." : "Guardar"}
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
