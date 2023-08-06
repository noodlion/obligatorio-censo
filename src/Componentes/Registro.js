import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Login.css";

const Registro = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const handleRegistroUsuario = async (e) => {
    e.preventDefault();

    const url = "https://censo.develotion.com/usuarios.php";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, password }),
      });

      if (response.ok) {
        //Registro exitoso, redirecciona a Dashboard
        navigate('/Dashboard');
      } else {
        //Registro fallido, obtener el mensaje de error de la API
        const data = await response.json();
        setError(data.message || "Error al registrar el usuario.");
      }
    } catch (error) {
      // Error en la solicitud, manejar el error
      setError("Error al registrar el usuario.");
    }
  };

  return (
      <div className="container">
      <div className="logo">Registro</div>
      <div className="login-item">
        <form onSubmit={handleRegistroUsuario} className="form form-login">
          {/* -------- Usuario --------*/}
          <div className="form-field">
            <label className="user" htmlFor="registro-username">
              <span className="hidden">htmlFor</span>
            </label>
            <input
              type="text"
              id="registro-username"
              name = "usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Usuario"
              className="input-formulario"
              required
            />
          </div>
          {/* -------- Contraseña --------*/}
          <div className="form-field">
            <label className="user" htmlFor="registro-password">
              <span className="hidden">Contraseña</span>
            </label>
            <input
              type="password"
              id="registro-password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="input-formulario"
              required
            />
          </div>
          {/* -------- Boton --------*/}
          <div className="form-field">
            <input type="submit" value="Registrarme" />
          </div>
          <Link to="/">¿Ya tienes cuenta? Loggeate aquí</Link>
          {error && <div>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Registro;
