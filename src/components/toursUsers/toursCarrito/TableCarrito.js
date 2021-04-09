import React from "react";

const TableCarrito = (props) => {
  function getTourByID(tours, id) {
    let s = tours.find((tour) => tour.id.toString() === id) || null;
    return tours.find((tour) => tour.id.toString() === id.toString()) || null;
  }

  function calcularTotal() {
    let total = 0;
    if (props.tours.length > 0 && props.reservaciones) {
      props.reservaciones.map((reservacion) => {
        total =
          total +
          reservacion.cantidad *
            getTourByID(props.tours, reservacion.tourID).precio;
      });
      return total;
    }
    return 0;
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Tour</th>
            <th>Cantidad</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {props.reservaciones.map((reservacion) => {
            return (
              <tr key={getTourByID(props.tours, reservacion.tourID).id}>
                <td>{getTourByID(props.tours, reservacion.tourID).nombre}</td>
                <td>{reservacion.cantidad}</td>
                <td>
                  {getTourByID(props.tours, reservacion.tourID).precio *
                    reservacion.cantidad}
                </td>
              </tr>
            );
          })}
          <tr>
            <td>Comisión(5%)</td>
            <td>&nbsp;</td>
            <td>{calcularTotal() * 0.05}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>&nbsp;</td>
            <td>{calcularTotal() + calcularTotal() * 0.05}</td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
      <button
        type="submit"
        onClick={props.handleSave}
        className="btn btn-primary"
      >
        {props.saving ? "Guardando..." : "Confirmar Compra"}
      </button>

      <button
        type="submit"
        onClick={props.limpiarCarrito}
        className="btn btn-primary"
      >
        Limpiar carrito
      </button>
    </>
  );
};

export default TableCarrito;
