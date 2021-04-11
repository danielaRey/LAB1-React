import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadTours } from "../../redux/actions/tourActions";
import { loadFotos } from "../../redux/actions/fotoActions";
import { loadReviews } from "../../redux/actions/reviewActions";
import { loadFavoritos } from "../../redux/actions/favoritoActions";
import { loadClientes } from "../../redux/actions/clienteActions";
import { newCliente } from "../../../models/tourModel";
import PropTypes from "prop-types";
import TourList from "./TourListCard";
import "react-datepicker/dist/react-datepicker.css";
import { NavLink } from "react-router-dom";

function TourCardManage({
  loadTours,
  loadFotos,
  loadReviews,
  loadFavoritos,
  loadClientes,
  ...props
}) {
  const [calificacionEstrellas, setCalificacionEstrellas] = useState(0);
  const [cantidadReviews, setCantidadReviews] = useState(0);

  useEffect(() => {
    if (props.fotos.length === 0) {
      loadFotos().catch((err) => {
        alert("loading fotos failed" + err);
      });
    }

    if (props.favoritos.length === 0) {
      loadFavoritos().catch((err) => {
        alert("loading favoritos failed" + err);
      });
    }

    if (props.reviews.length === 0) {
      loadReviews().catch((err) => {
        alert("loading reviews failed" + err);
      });
    }

    if (props.clientes.length === 0) {
      loadClientes().catch((err) => {
        alert("loading clientes failed" + err);
      });
    }

    if (props.tours.length === 0) {
      loadTours().catch((err) => {
        alert("loading tours failed" + err);
      });
    }
  }, [props.tours, props.favoritos]);
  var all = document.getElementsByClassName("hryWAp");
  for (var i = 0; i < all.length; i++) {
    all[i].style.height = "68px";
  }
  return (
    <>
      {props.tours.length > 0 ? (
        <TourList
          tours={props.tours}
          fotos={props.fotos}
          reviews={props.reviews}
          cliente={props.cliente}
          favoritos={props.favoritos}
        ></TourList>
      ) : (
        <>
          <p>No se encontro ningún tour con esos criterios.</p>
          <NavLink to="/" className="btn btn-primary">
            Regresar
          </NavLink>
        </>
      )}
    </>
  );
}

TourCardManage.propTypes = {
  reviews: PropTypes.array.isRequired,
  tours: PropTypes.array.isRequired,
  fotos: PropTypes.array.isRequired,
  cliente: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  loadTours: PropTypes.func.isRequired,
  loadFotos: PropTypes.func.isRequired,
  loadReviews: PropTypes.func.isRequired,
  loadFavoritos: PropTypes.func.isRequired,
  loadClientes: PropTypes.func.isRequired,
};

export function getFavoritosByCliente(favoritos, clienteID) {
  return (
    favoritos.find((fav) => fav.clienteIdentificacion === clienteID) || null
  );
}

export function getClienteByCorreo(clientes, correo) {
  return clientes.find((c) => c.usuarioCorreo === correo) || null;
}

//what part pf the state is passed to our components via props
function mapStateToProps(state, ownProps) {
  const pais = ownProps.match.params.pais;

  const idaParam = ownProps.match.params.ida;
  const ida =
    idaParam !== "undefined"
      ? new Date(idaParam).toISOString().substr(0, 10).replace(/-/g, "-")
      : "";

  const vueltaParam = ownProps.match.params.vuelta;
  const vuelta =
    vueltaParam !== "undefined"
      ? new Date(vueltaParam).toISOString().substr(0, 10).replace(/-/g, "-")
      : "";

  const filtered = state.tours.filter((tour) => {
    if (tour.pais) {
      return (
        tour.pais.toLowerCase().includes(pais.toLowerCase()) ||
        tour.fechaIda === ida ||
        tour.fechaVuelta === vuelta
      );
    }
  });

  //-------favorito-----
  const STORAGE_NAME = "tokenmovt";
  let jsonToken = localStorage.getItem(STORAGE_NAME)
    ? JSON.parse(localStorage.getItem(STORAGE_NAME))
    : null;

  const cliente =
    jsonToken && state.clientes.length > 0
      ? getClienteByCorreo(state.clientes, jsonToken["token"])
      : newCliente;

  return {
    reviews: state.reviews,
    fotos: state.fotos,
    tours: filtered,
    cliente: cliente,
    clientes: state.clientes,
    loading: state.apiCallsInProgress > 0,
    favoritos: state.favoritos,
  };
}

//what actions we want to expose in our components via props
const mapDispatchToProps = {
  loadTours,
  loadFotos,
  loadReviews,
  loadFavoritos,
  loadClientes,
  //actions: bindActionCreators(tourActions, dispatch),
};

//two functions call
export default connect(mapStateToProps, mapDispatchToProps)(TourCardManage);
