import React from "react";
import { useState } from "react";
import "../Styles/AgregarPersona.css";
import { Link, useNavigate } from "react-router-dom";

/*  -------- OBJETO PERSONA --------
    "idUsuario": 6,
    "nombre": "Persona 12",
    "departamento": 44,
    "ciudad": 22,
    "fechaNacimiento": "2001-09-29",
    "ocupacion": 3 */

const AgregarPersona = () => {

  {/*-------- Defino objeto persona -------- */}
  const [datosPersona, setDatosPersona] = useState({
    idUsuario: "",
    nombre: "",
    departamento: "",
    ciudad: "",
    fechaNacimiento: "",
    ocupacion: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  

  const handleAgregarPersona = async (e) => {
    e.preventDefault();
    
    const url = "https://censo.develotion.com/personas.php";
    /*Tomo mis datos del login */
    const apiKey = localStorage.getItem(apiKey);
    const idUser = localStorage.getItem(idUser);
    
    try {
      const response = fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: apiKey,
          idUser: idUser
        },
        body: JSON.stringify({datosPersona}),
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
  }

  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   handleAgregarPersona();
  // };

  return (
    <div>
      <h2>Agregar persona censada</h2>
      <form className="form-persona" onSubmit={handleAgregarPersona}>
        {/* -------- Nombre --------*/}
        <label htmlFor="nombreCompleto">Nombre Completo</label>
        <input
          type="text"
          id="nombreCompleto"
          name="nombre"
          placeholder="Juan Perez"
        />
        {/* -------- Fecha de nacimiento --------*/}
        <label htmlFor="fechaNac">Fecha de Nacimiento</label>
        <input
          type="date"
          id="fechaNac"
          name="fechaNacimiento"
          required
          pattern="\d{4}-\d{2}-\d{2}"
          min="1920-01-01"
        />
        {/* ------------------ SELECTS ------------------*/}
        {/* -------- Departamento --------*/}
        <label htmlFor="departamento">Departamento</label>
        <select id="departamento" name="departamento" default="Departamento">
          <option value="value1">
            Selecciona un departamento
          </option>
        </select>
        {/* -------- Ciudad --------*/}
        <label htmlFor="ciudad">Ciudad</label>
        <select id="ciudad" name="ciudadDpto" default="Ciudad">
          <option>Selecciona ciudad</option>
        </select>
        {/* -------- Ocupacion --------*/}
        <label htmlFor="ocupacion">Ocupacion</label>
        <select id="ocupacion" name="ocupacion" default="Ocupacion actual">
          <option value="value1">
            Selecciona ocupacion
          </option>
        </select>
        {/* -------- Boton --------*/}
        <input type="submit" value="Registrar" />
      </form>
    </div>
  );
};

export default AgregarPersona;
