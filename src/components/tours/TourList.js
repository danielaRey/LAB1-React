import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TourList = ({ tours }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Nombre</th>
        <th>Categoría</th>
        <th>Fecha Ida</th>
      </tr>
    </thead>
    <tbody>
      {tours.map((tour) => {
        return (
          <tr key={tour.id}>
            <td>
              <a
                className="btn btn-light"
                href={"http://pluralsight.com/courses/" + tour.slug}
              >
                Watch
              </a>
            </td>
            <td>
              <Link to={"/course/" + tour.slug}>{tour.nombre}</Link>
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
