import React from "react";
import sus from "../../../../imagenes/sushi.png";
import alv from "../../../../imagenes/tabla4.png";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { NavLink } from "react-router-dom";
import TextInput from "../../common/TextInput";
import ReactStars from "react-rating-stars-component";

const TourDetails = (props) => {
  const tokenExists = localStorage.getItem("tokenmovt");
  return (
    <>
      <Carousel infiniteLoop={true}>
        {props.fotos.map((foto) => {
          let imgTourPath = foto.pathImagen.substring(12);
          const srcImg = "../../../imagenes/" + imgTourPath;
          return (
            <div key={foto.id}>
              <img src={srcImg} />
            </div>
          );
        })}
      </Carousel>
      <hr
        style={{
          height: "1px",
          borderWidth: "0",
          backgroundColor: "gray",
        }}
      ></hr>
      <div className="row">
        <div className="col-9">
          <p>{props.tour.descripcion}</p>
          <p>Hora de inicio: {props.tour.horaInicio}</p>
          <p>Indicaciones a seguir: {props.tour.indicacionesGenerales}</p>
          <h5>Actividades</h5>
          <table
            className="table table-success table-stripe"
            style={{ width: "auto" }}
          >
            <thead>
              <tr>
                <th>Actividades Incluidas</th>
                <th>Actividades NO Incluidas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{props.tour.actividadesIncluidas}</td>
                <td>{props.tour.actividadesNoIncluidas}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col">
          <p>
            {" "}
            Desde <br />$ {props.tour.precio}
            <br /> por persona
          </p>
          {tokenExists ? (
            <div>
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
            </div>
          ) : (
            <> </>
          )}
        </div>
      </div>
      <hr
        style={{
          height: "1px",
          borderWidth: "0",
          backgroundColor: "gray",
        }}
      ></hr>
      <h4>Reviews</h4>
      {props.reviews.map((review) => {
        return (
          <div
            key={review.id}
            style={{
              border: "1px ridge gray",
              padding: "5px",
              marginBottom: "2px",
            }}
          >
            <ReactStars
              count={5}
              size={24}
              value={review.calificacion}
              edit={false}
              activeColor="#ffd700"
            />
            <p>
              {review.clienteNombre} - {review.comentario}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default TourDetails;
