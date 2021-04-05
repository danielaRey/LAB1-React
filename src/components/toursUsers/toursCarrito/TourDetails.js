import React from "react";
import sus from "../../../../imagenes/sushi.png";
import alv from "../../../../imagenes/tabla4.png";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { NavLink } from "react-router-dom";
import TextInput from "../../common/TextInput";

const TourDetails = (props) => {
  const tokenExists = localStorage.getItem("tokenmovt");
  debugger;
  return (
    <>
      <Carousel infiniteLoop={true}>
        {props.fotos.map((foto) => {
          let imgTourPath = foto.pathImagen.substring(44);
          const srcImg = "../../../imagenes/" + imgTourPath;
          debugger;
          return (
            <div key={foto.id}>
              <img src={srcImg} />
              <p className="legend">Legend 1</p>
            </div>
          );
        })}
      </Carousel>
      <p>{props.tour.descripcion}</p>
      <p>{props.tour.horaInicio}</p>
      <p>{props.tour.indicacionesGenerales}</p>
      <p>{props.tour.actividadesIncluidas}</p>
      <p>{props.tour.actividadesNoIncluidas}</p>
      {tokenExists ? (
        <div>
          <p>HOLA TOKEN EXISTS</p>
          <p>precio: {props.tour.precio}</p>
          <form onSubmit={props.onSave}>
            <TextInput
              name="cantidad"
              typeInput="number"
              label="Cantidad"
              value={props.reservacion.cantidad}
              onChange={props.onChange}
              error={props.errors.cantidad}
            />
            <button
              type="submit"
              disabled={props.saving}
              className="btn btn-primary"
            >
              {props.saving ? "Guardando..." : "Reserva ya!"}
            </button>
          </form>
          <p>reservacion: {props.reservacion.cantidad}</p>
          <NavLink to="/tours/carrito/">Reserva ya!</NavLink>
        </div>
      ) : (
        <p>ADIOS TOKEN NO EXISTE</p>
      )}
      {props.reviews.map((review) => {
        return (
          <div key={review.id}>
            <p>{review.calificacion}</p>
            <p>{review.clienteNombre}</p>
            <p>{review.comentario}</p>
          </div>
        );
      })}
    </>
  );
};

export default TourDetails;
