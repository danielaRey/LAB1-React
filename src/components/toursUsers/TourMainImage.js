import React from "react";
import Heart from "react-animated-heart";

const TourMainImage = (props) => {
  console.log("props: " + props);

  const activeStyle = { color: "#F15B2A" };
  const fotoTour = props.fotos.find(
    (f) => f.tourID === props.tourID && f.nombre === "principal"
  );
  let imgTourPath = fotoTour ? fotoTour.pathImagen.substring(12) : "";

  const srcImg = "../../../imagenes/" + imgTourPath;

  return (
    <div>
      <Heart
        style={{ position: "absolute" }}
        isClick={props.esFavorito}
        onClick={() => console.log("")}
      />
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
