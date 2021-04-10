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

const newCliente = {
  identificacion: "",
  usuarioCorreo: "",
  nombre: "",
  apellidos: "",
  pais: "",
  fechaNacimiento: null,
};

const newFoto = {
  id: null,
  nombre: "",
  imagen: "",
  pathImagen: "",
  tourID: "",
};

module.exports = {
  newTour,
  newReservacion,
  newUsuario,
  newCliente,
  newFoto,
};
