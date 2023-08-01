// import React from "react";
// import { Link, useNavigate } from "react-router-dom"
// import { useRef, useState } from "react";
// import "../Styles/Login.css";

// const Login = () => {
//   const usuario = useRef(null);
//   const password = useRef(null);

//   let navigate = useNavigate();

//   const [error, setError] = useState(false);

//   //handler para el boton on Click
//   const onIngresarHandler = () => {

//     const censo = "https://censo.develotion.com";
//     const userCampo = user.current.value;
//     const passCampo = password.current.value;
//     //console.log(userCampo, passCampo);
//     if (userCampo != "" && passCampo != "") {
//       localStorage.setItem("usuario", "a");
      
//     } else {
//       //setError("Usuario y/o contraseña incorrectos");
//       localStorage.clear();
//       setError(true);
//     }
//   };

//   return (
//     <div className="contenedor-formulario">
//       <h2 className="login-titulo">Login</h2>
//       <label htmlFor="usuarioLogin">Usuario</label>
//       <input
//         type="text"
//         id="usuarioLogin"
//         name="usuario"
//         placeholder="Usuario"
//         className="input-formulario"
//         ref={usuario}
//       />
//       <label htmlFor="contraseñaLogin">Contraseña</label>
//       <input
//         type="text"
//         id="contraseñaLogin"
//         name="contraseña"
//         placeholder="Contraseña"
//         className="input-formulario"
//         ref={password}
//       />
//       <input type="submit" className="btn-formulario" value="Iniciar sesion" onClick="onIngresarHandler"/>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';

const LoginForm = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleLogin = () => {
    const url = 'https://censo.develotion.com/login.php'

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usuario, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.apiKey) {
          // Si el login es exitoso, guardamos el id y la apikey en el localStorage
          localStorage.setItem('id', data.id);
          localStorage.setItem('apiKey', data.apiKey);
          setLoginError(false);
        } else {
          // Si el login es incorrecto, mostramos el mensaje de error
          setLoginError(true);
          localStorage.clear();
        }
      })
      .catch((error) => {
        // Si hay algún error en la solicitud, también mostramos el mensaje de error
        localStorage.clear();
        setLoginError(true);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        placeholder="Usuario"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
      />
      <button type="submit">Iniciar sesión</button>
      {loginError && <p>Usuario o contraseña incorrectos</p>}
    </form>
  );
};

export default LoginForm;