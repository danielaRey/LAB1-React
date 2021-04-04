const newTour = {
  id: null,
  nombre: "",
  categoria: "",
  descripcion: "",
  horaInicio: "",
  indicacionesGenerales: "",
  actividadesIncluidas: "",
  actividadesNoIncluidas: "",
  precio: -1,
};

const newReservacion = {
  id: null,
  cantidad: 1,
  clienteIdentificacion: "",
  tourID: "",
};
module.exports = {
  newTour,
  newReservacion,
};
