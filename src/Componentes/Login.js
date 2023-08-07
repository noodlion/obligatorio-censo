import React, { useEffect, useState } from "react";
import "../Styles/Login.css";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [btnHabilitado, setBtnHabilitado] = useState(false);

  let navigate = useNavigate();

  //Validacion de boton desactivado si los campos estan vacios
  useEffect(() => {
    if((usuario && password) === "") { 
      setBtnHabilitado(false);
    } else {
      setBtnHabilitado(true);
    }
  }, [usuario, password])

  
  const handleLogin = () => {
    const url = "https://censo.develotion.com/login.php";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.apiKey) {
          //Si el login es exitoso, guarda id y apikey en el localStorage
          localStorage.setItem("id", data.id);
          localStorage.setItem("apiKey", data.apiKey);
          setLoginError(false);
          navigate("/Dashboard")
          console.log(data)
        } else {
          //Si el login es incorrecto, tiro msj de error y limpia el localStorage
          setLoginError(true);
          localStorage.clear();
        }
      })
      .catch((error) => {
        // Si hay algún error en la solicitud, también muestro el msj de error
        localStorage.clear();
        setLoginError(true);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="container">
      <div className="logo">Login</div>
      <div className="login-item">
      <form onSubmit={handleSubmit} className="form form-login">
        {/* -------- Usuario --------*/}
        <div className="form-field">
          <label className="user" htmlFor="login-username">
            <span className="hidden">htmlFor</span>
          </label>
          <input
            type="text"
            id="login-username"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Usuario"
            className="input-formulario"
            
          />
        </div>
        {/* -------- Contraseña --------*/}
        <div className="form-field">
          <label className="user" htmlFor="login-password">
            <span className="hidden">Contraseña</span>
          </label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="input-formulario"
            
          />
        </div>
        {/* -------- Boton --------*/}
        <div className="form-field">
          <input type="submit" value='Iniciar sesión' disabled={!btnHabilitado}/>
        </div>
        {loginError && <p>Usuario o contraseña incorrectos</p>}
      </form>
      {/* -------- Link al Registro --------*/}
      <Link to="/Registro">¿No tienes cuenta? Registrate aquí</Link>
      
      </div>
    </div>
  );
};

export default LoginForm;
