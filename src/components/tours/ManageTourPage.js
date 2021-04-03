import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadTours, saveTour } from "../../redux/actions/tourActions";
import PropTypes from "prop-types";
import TourForm from "./TourForm";
import { newTour } from "../../../models/tourModel";
import { toast } from "react-toastify";

function ManageTourPage({ tours, loadTours, saveTour, history, ...props }) {
  const [tour, setTour] = useState({ ...props.tour });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (tours.length === 0) {
      loadTours().catch((error) => {
        alert("Loading tours failed" + error);
      });
    } else {
      setTour({ ...props.tour });
    }
  }, [props.tour]);

  function handleChange(event) {
    //[name]: name === "authorId" ? parseInt(value, 10) : value,
    const { name, value } = event.target;
    setTour((prevTour) => ({
      ...prevTour,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { nombre, categoria } = tour;
    const errors = {};

    if (!nombre) errors.nombre = "Nombre es requerido";
    if (!categoria) errors.categoria = "Categoría es requerida.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveTour(tour)
      .then(() => {
        toast.success("Tour guardado.");
        history.push("/tours");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return (
    <TourForm
      tour={tour}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageTourPage.propTypes = {
  tour: PropTypes.object.isRequired,
  tours: PropTypes.array.isRequired,
  loadTours: PropTypes.func.isRequired,
  saveTour: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getTourByID(tours, id) {
  return tours.find((tour) => tour.id.toString() === id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const tour =
    id && state.tours.length > 0 ? getTourByID(state.tours, id) : newTour;
  return {
    tour,
    tours: state.tours,
  };
}

const mapDispatchToProps = {
  loadTours,
  saveTour,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTourPage);
