import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TourList = ({ tours }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Categoría</th>
        <th>Fecha</th>
      </tr>
    </thead>
    <tbody>
      {tours.map((tour) => {
        return (
          <tr key={tour.id}>
            <td>
              <Link to={"/tour/" + tour.id}>{tour.nombre}</Link>
            </td>
            <td>{tour.categoria}</td>
            <td>{tour.fechaIda}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

TourList.propTypes = {
  tours: PropTypes.array.isRequired,
};

export default TourList;
