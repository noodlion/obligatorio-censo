import React from "react";
import { Link } from 'react-router-dom';

const Registro = () => {
  return (
    <div>
      <form>
        <h2 className="registro-titulo">Registro</h2>
        <label htmlFor="usuarioRegistro">Usuario</label>
        <input
          type="text"
          id="usuarioRegistro"
          name="usuario"
          placeholder="Usuario"
          className="input-formulario"
        />
        <label htmlFor="contraseñaRegistro">Contraseña</label>
        <input
          type="text"
          id="contraseñaRegistro"
          name="contraseña"
          placeholder="Contraseña"
          className="input-formulario"
        />
        <input type="submit" className="btn-formulario" value="Aceptar" />
      </form>
      <Link to="/">¿Ya tienes cuenta? Loggeate aquí</Link>
    </div>
  );
};

export default Registro;
