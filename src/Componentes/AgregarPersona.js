import React from "react";

/*  "idUsuario": 6,
    "nombre": "Persona 12",
    "departamento": 44,
    "ciudad": 22,
    "fechaNacimiento": "2001-09-29",
    "ocupacion": 3 */

const AgregarPersona = () => {
  const departamentos = useSelector((state) => state.departamentos.data); //consulto los departamentos que saque de mi Store

  return (
    <div>
      <h2>Agregar persona censada</h2>
      <label htmlFor="nombreCompleto">Nombre Completo</label>
      <input
        type="text"
        id="nombreCompleto"
        name="nombre"
        placeholder="Juan Perez"
      />
      <label htmlFor="fechaNac">Fecha de Nacimiento</label>
      <input
        type="date"
        id="fechaNac"
        name="fechaNacimiento"
        required
        pattern="\d{4}-\d{2}-\d{2}"
        min="1920-01-01"
      />
      <label htmlFor="departamento">Departamento</label>
      <select id="departamento" name="departamento" default="Departamento" />
      <label htmlFor="ciudad">Ciudad</label>
      <select id="ciudad" name="ciudadDpto" default="Ciudad" />
      <label htmlFor="ocupacion">Ocupacion</label>
      <select id="ocupacion" name="ocupacion" default="Ocupacion actual" />
    </div>
  );
};

export default AgregarPersona;
