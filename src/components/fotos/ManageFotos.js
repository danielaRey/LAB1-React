import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { saveFoto } from "../../redux/actions/fotoActions";
import PropTypes from "prop-types";
import { newFoto } from "../../../models/tourModel";
import { toast } from "react-toastify";
import FotoForm from "./FotoForm";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";

function ManageTourPage({ saveFoto, history, ...props }) {
  const [foto, setFoto] = useState(newFoto);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {}, [props.foto]);

  function handleChange(event) {
    const id = props.match.params.id;
    debugger;
    const { name, value } = event.target;
    setFoto((prevFoto) => ({
      ...prevFoto,
      [name]: value,
    }));

    if (name === "imagen") {
      setFoto((prevFoto) => ({
        ...prevFoto,
        ["pathImagen"]: value.replace(/C:\\fakepath\\/i, ""),
      }));
    }

    setFoto((prevFoto) => ({
      ...prevFoto,
      ["tourID"]: id,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    saveFoto(foto)
      .then(() => {})
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
    toast.success("Foto guardada.");
    history.push("/tours");
  }

  return (
    <>
      {" "}
      {props.token && props.token["tipoUsuario"] === 1 ? (
        <>
          <NavLink to="/tours" className="btn btn-primary">
            Regresar
          </NavLink>
          <FotoForm
            foto={foto}
            errors={errors}
            onChange={handleChange}
            onSave={handleSave}
            saving={saving}
          />
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}

ManageTourPage.propTypes = {
  foto: PropTypes.object.isRequired,
  saveFoto: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const { name, value } = event.target;
  //   setFoto((prevFoto) => ({
  //     ...prevFoto,
  //     ["tourID"]: id,
  //   }));
  //   let f = state.foto;
  //   debugger;
  return {
    foto: state.foto,
  };
}

const mapDispatchToProps = {
  saveFoto,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTourPage);
