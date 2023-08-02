import React, { useState } from "react";
import "../Styles/Login.css";

const LoginForm = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);


  //Falta implementar el boton desactivado hasta que ambos campos esten vacios
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
        } else {
          //Si el login es incorrecto, tiro msj de error y limpia el localStorage
          setLoginError(true);
          localStorage.clear();
        }
      })
      .catch((error) => {
        // i hay algún error en la solicitud, también muestro el msj de error
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
            required
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
            required
          />
        </div>
        {/* -------- Boton --------*/}
        <div className="form-field">
          <input type="submit"  value='Iniciar sesión'/>
        </div>
        {loginError && <p className="form-msg">Usuario o contraseña incorrectos</p>}
      </form>
      </div>
    </div>
  );
};

export default LoginForm;
