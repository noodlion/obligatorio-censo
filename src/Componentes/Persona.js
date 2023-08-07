import React from "react";

const Persona = ({ persona, departamentos, ciudades }) => {
  const departamentosArray = departamentos.data;

  const obtenerNombreDepartamento = (idDepartamento) => {
    const departamento = departamentosArray.find(
      (dep) => dep.id === idDepartamento
    );
    return departamento ? departamento.nombre : "";
  };

  //Ya que ciudades devuelve un objeto con un codigo y dos array, hay que buscar en los dos array
  const obtenerNombreCiudad = (idCiudad) => {
    for(const ciudadArray of Object.values(ciudades)) {
      const ciudad = ciudadArray.find((ciu) => ciu.id === idCiudad);
      if (ciudad) {
        return ciudad.nombre;
      }
    }
    return 'No hay ciudad o le erraste';
  }
 
 //Otra manera podria ser usando destructuring pero Object.values toma todos los array que podrian haber en ese objeto en caso de que algun dia se agregaran mas array
  
//  const ciudadesArray = [...ciuades.ciudades[0], ...ciuades.ciudades[0]];

//   const obtenerNombreCiudad = (idCiudad) => {
//     const ciudad = ciudadesArray.find((ciu) => ciu.id === idCiudad);
//     return ciudad ? ciudad.nombre : '';
//   };

  return (
    <tr>
      <td>{persona.nombre}</td>
      <td>{obtenerNombreDepartamento(persona.departamento)}</td>
      <td>{obtenerNombreCiudad(persona.ciudad)}</td>
      <td>{persona.fechaNacimiento}</td>
      <td>{persona.ocupacion}</td>
    </tr>
  );
};

export default Persona;
