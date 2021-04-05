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

const newUsuario = {
  correo: "",
  password: "",
  tipoUsuario: 0,
};
module.exports = {
  newTour,
  newReservacion,
  newUsuario,
};
