import React from "react";
import sus from "../../../imagenes/sushi.png";

const TourMainImage = (props) => {
  console.log("props: " + props);

  const activeStyle = { color: "#F15B2A" };
  const fotoTour = props.fotos.find(
    (f) => f.tourID === props.tourID && f.nombre === "principal"
  );
  let imgTourPath = fotoTour ? fotoTour.pathImagen.substring(44) : "";

  const srcImg = "../../../imagenes/" + imgTourPath;

  debugger;
  return fotoTour ? (
    <img className="card-img-top" src={srcImg} alt={fotoTour.nombre}></img>
  ) : (
    <img className="card-img-top" src={sus} alt={props.tourID}></img>
  );
};

export default TourMainImage;
