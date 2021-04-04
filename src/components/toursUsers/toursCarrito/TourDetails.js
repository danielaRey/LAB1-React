import React from "react";
import sus from "../../../../imagenes/sushi.png";
import alv from "../../../../imagenes/tabla4.png";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const TourDetails = (props) => {
  // function amountReviewsTourID() {
  //   const filterReviews = props.reviews.filter(
  //     (review) => review.tourID == props.tourID
  //   );
  //   return filterReviews.length;
  // }

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
      {props.reviews.map((review) => {
        return (
          <div key={review.id}>
            <p>{review.calificacion}</p>
            <p>{review.comentario}</p>
          </div>
        );
      })}
    </>
  );
};

export default TourDetails;
