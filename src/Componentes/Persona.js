import React from 'react'

const Persona = ({persona}) => {
  return (
    <div>
        <p>{persona.idUsuario}</p>
        <p>{persona.nombre}</p>
        <p>{persona.departamento}</p>
        <p>{persona.ciudad}</p>
        <p>{persona.fechaNacimiento}</p>
        <p>{persona.ocupacion}</p>
    </div>
  )
}

export default Persona