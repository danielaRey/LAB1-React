import React from "react";
import ReactStars from "react-rating-stars-component";

const TourCalificaciones = (props) => {
  function amountReviewsTourID() {
    const filterReviews = props.reviews.filter(
      (review) => review.tourID == props.tourID
    );
    return filterReviews.length;
  }

  function cantidadEstrellasTourID() {
    let calificacion = 0;
    let i = 0;

    const filterReviews = props.reviews.filter(
      (review) => review.tourID == props.tourID
    );
    for (i = 0; i < filterReviews.length; i++) {
      calificacion = calificacion + parseInt(filterReviews[i].calificacion);
    }
    return (
      calificacion / (amountReviewsTourID() == 0 ? 1 : amountReviewsTourID())
    );
  }

  return (
    <>
      <p>Cantidad de Reviews: {amountReviewsTourID()}</p>
      <p>
        {" "}
        <ReactStars
          count={5}
          size={24}
          value={cantidadEstrellasTourID()}
          edit={false}
          activeColor="#ffd700"
        />
        {"calificación: "}
        {cantidadEstrellasTourID()}
      </p>
    </>
  );
};

export default TourCalificaciones;
