import React from "react";
import sus from "../../../imagenes/sushi.png";

const TourMainImage = (props) => {
  console.log("props: " + props);

  const activeStyle = { color: "#F15B2A" };
  const fotoTour = props.fotos.find(
    (f) => f.tourID === props.tourID && f.nombre === "principal"
  );
  debugger;
  let imgTourPath = fotoTour ? fotoTour.pathImagen.substring(12) : "";

  const srcImg = "../../../imagenes/" + imgTourPath;

  return (
    <img
      style={{ float: "right", width: "60%" }}
      className="card-img-top"
      src={srcImg}
      alt={fotoTour.nombre}
    ></img>
  );
};

export default TourMainImage;
