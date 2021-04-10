import React from "react";

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
      <p>Calificación: {cantidadEstrellasTourID()}</p>
      <p>Cantidad de Reviews: {amountReviewsTourID()}</p>
    </>
  );
};

export default TourCalificaciones;
