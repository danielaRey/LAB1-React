import React, { useState } from "react";
import Heart from "react-animated-heart";
import * as favoritoApi from "../../api/favoritoApi";

const TourMainImage = (props) => {
  const [esFavoritoClick, setEsFavoritoClick] = useState(
    props.favorito.esFavorito
  );

  const activeStyle = { color: "#F15B2A" };
  const fotoTour = props.fotos.find(
    (f) => f.tourID === props.tourID && f.nombre === "principal"
  );
  let imgTourPath = fotoTour ? fotoTour.pathImagen.substring(12) : "";

  const srcImg = "../../../imagenes/" + imgTourPath;

  function handleSave() {
    debugger;
    setEsFavoritoClick(!esFavoritoClick);

    const intValue = !esFavoritoClick ? 1 : 0;
    const favorito = { ...props.favorito, esFavorito: intValue };

    if (favorito.tourID) {
      return favoritoApi
        .updateFavorito(favorito)
        .then((data) => {
          debugger;
          let a = data.responseText;
          debugger;
          location.reload();
          return false;
        })
        .catch();
    } else {
      const favCreate = {
        ...props.favorito,
        tourID: props.tourID,
        clienteIdentificacion: props.cliente.identificacion,
        esFavorito: intValue,
      };
      debugger;
      return favoritoApi
        .saveFavorito(favCreate)
        .then((data) => {
          debugger;
          let a = data.responseText;
          debugger;
          location.reload();
          return false;
        })
        .catch();
    }
  }

  function loginUser(credentials) {
    console.log(credentials);
  }

  return (
    <div>
      <Heart isClick={esFavoritoClick} onClick={() => handleSave()} />

      <img
        style={{ float: "right", width: "60%" }}
        className="card-img-top"
        src={srcImg}
        alt={fotoTour.nombre}
      ></img>
    </div>
  );
};

export default TourMainImage;
