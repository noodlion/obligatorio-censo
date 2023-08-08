import React from "react";

const Persona = ({ persona, departamentos, ciudades, ocupaciones }) => {
  const departamentosArray = departamentos.data;
  const ocupacionesArray = ocupaciones.data;
  
  const obtenerNombreDepartamento = (idDepartamento) => {
    const departamento = departamentosArray.find(
      (dep) => dep.id === idDepartamento
    );
    return departamento ? departamento.nombre : "";
  };

  const obtenerNombreOcupacion = (idOcup) => {
    const ocupacion = ocupacionesArray.find(
      (ocup) => ocup.id === idOcup
    );
    return ocupacion ? ocupacion.ocupacion : "";
  };

  //Ya que ciudades devuelve un objeto con un codigo y dos array, hay que buscar en los dos array
  // const obtenerNombreCiudad = (idCiudad) => {
  //   for(const ciudadArray of Object.values(ciudades)) {
  //     const ciudad = ciudadArray.find((ciu) => ciu.id === idCiudad);
  //     if (ciudad) {
  //       return ciudad.nombre;
  //     }
  //   }
  //   return 'No hay ciudad asignada';
  // }
  const obtenerNombreCiudad = (idCiudad) => {
    const ciudad = ciudades.find((ciu) => ciu.id === idCiudad);
    return ciudad ? ciudad.nombre : 'No hay ciudad asignada';
  }
  
  return (
    <tr>
      <td>{persona.nombre}</td>
      <td>{obtenerNombreDepartamento(persona.departamento)}</td>
      <td>{obtenerNombreCiudad(persona.ciudad)}</td>
      <td>{persona.fechaNacimiento}</td>
      <td>{obtenerNombreOcupacion(persona.ocupacion)}</td>
    </tr>
  );
};

export default Persona;

 //Otra manera podria ser usando destructuring pero Object.values toma todos los array que podrian haber en ese objeto en caso de que algun dia se agregaran mas array
  
//  const ciudadesArray = [...ciuades.ciudades[0], ...ciuades.ciudades[1]];

//   const obtenerNombreCiudad = (idCiudad) => {
//     const ciudad = ciudadesArray.find((ciu) => ciu.id === idCiudad);
//     return ciudad ? ciudad.nombre : '';
//   };