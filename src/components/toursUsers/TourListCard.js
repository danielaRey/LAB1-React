import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TourMainImage from "./TourMainImage";
import TourCalificaciones from "./TourCalificaciones";
import Heart from "react-animated-heart";
import { newFavorito } from "../../../models/tourModel";

const lll =
  "https://images.unsplash.com/photo-1497398276231-94ff5dc90217?w=900";
const ostyle = {
  backgroundSize: "cover",
  backgroundColor: "blue",
};

const activeStyle = {
  backgroundColor: "blue",
};

// var all = document.getElementsByClassName("hryWAp");
// debugger;
// for (var i = 0; i < all.length; i++) {
//   all[i].style.height = "60px";
// }

const TourListCard = ({ tours, fotos, reviews, cliente, favoritos }) => {
  function filterFavoritos(tourID) {
    debugger;
    const filterFav = favoritos.filter(
      (f) => f.clienteIdentificacion == cliente.identificacion
    );

    const fav = filterFav.find((f) => f.tourID === tourID);
    return fav ? fav : newFavorito;
  }

  return (
    <>
      {tours.map((tour) => {
        return (
          <>
            <div
              key={tour.id}
              id={tour.id}
              className="w-full sm:w-1/2 md:w-1/3 flex flex-col p-3"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
                <div className="bg-cover h-100  ">
                  <TourMainImage
                    fotos={fotos}
                    tourID={tour.id}
                    esFavorito={filterFavoritos(tour.id).esFavorito}
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="mb-4 text-2xl">
                    <Link
                      style={{ cursor: "pointer" }}
                      to={"/tour/details/" + tour.id}
                    >
                      {tour.nombre}
                    </Link>
                  </h3>
                  <div className="mb-4 text-grey-darker text-sm flex-1">
                    <p className="card-text">Duración: {tour.duracion}</p>
                    <p className="card-text">Precio: {tour.precio}</p>
                    <TourCalificaciones reviews={reviews} tourID={tour.id} />
                  </div>
                  <a
                    href="#"
                    className="border-t border-grey-light pt-2 text-xs text-grey hover:text-red uppercase no-underline tracking-wide"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

TourListCard.propTypes = {
  tours: PropTypes.array.isRequired,
  fotos: PropTypes.array.isRequired,
  reviews: PropTypes.array,
};

export default TourListCard;
