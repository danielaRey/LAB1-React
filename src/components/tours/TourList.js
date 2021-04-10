import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TourList = ({ tours }) => (
  <table className="table table-striped table-bordered">
    <thead className="table-success">
      <tr>
        <th>Nombre</th>
        <th>Categoría</th>
        <th>Fecha Ida</th>
        <th>País</th>
        <th>Subir Fotos </th>
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
            <td>{tour.pais}</td>
            <td>
              <Link className="btn btn-success" to={"/fotos/" + tour.id}>
                Subir Foto
              </Link>
            </td>
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
