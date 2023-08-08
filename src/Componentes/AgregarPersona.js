import React from "react";
import { useState } from "react";
import "../Styles/AgregarPersona.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AgregarPersona = () => {
  /*Tomo mis datos del login */
  const apiKey = localStorage.getItem("apiKey");
  const idUser = localStorage.getItem("id");
  {
    /*-------- Defino objeto persona -------- */
  }
  const [datosPersona, setDatosPersona] = useState({
    idUsuario: idUser,
    nombre: "",
    departamento: "",
    ciudad: "",
    fechaNacimiento: "",
    ocupacion: "",
  });

  //Pido las ocupaciones y departamentos guardadas en mi store
  const departamentos = useSelector((state) => state.departamentos.data);
  const ciudades = useSelector((state) => state.ciudades.data);
  const ocupaciones = useSelector((state) => state.ocupaciones.data);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAgregarPersona = async (e) => {
    e.preventDefault();
    const url = "https://censo.develotion.com/personas.php";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: apiKey,
          idUser: idUser,
        },
        body: JSON.stringify(datosPersona),
      });

      if (response.ok) {
        navigate("/Dashboard");
      } else {
        const data = await response.json();
        setError(data.message || "Error al registrar el usuario.");
      }
    } catch (error) {
      setError("Error al registrar el usuario.");
    }
  };

  return (
    <div>
      {console.log("Agregar persona check in")}
      {console.log("Ocupaciones", ocupaciones)}
      {console.log("Departamentos", departamentos)}

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
        <select
          id="departamento"
          name="departamento"
          value={datosPersona.departamento}
          onChange={(e) =>
            setDatosPersona({ ...datosPersona, departamento: e.target.value })
          }
        >
          <option value="">Selecciona un departamento</option>
          {departamentos.map((departamento) => (
            <option key={departamento.id} value={departamento.id}>
              {departamento.nombre}
            </option>
          ))}
        </select>

        {/* -------- Ciudad --------*/}
        <label htmlFor="ciudad">Ciudad</label>
        <select
          id="ciudad"
          name="ciudadDpto"        
        >
          <option value="">Selecciona ciudad</option>
        </select>

        {/* -------- Ocupacion --------*/}
        <label htmlFor="ocupacion">Ocupacion</label>
        <select
          id="ocupacion"
          name="ocupacion"
          value={datosPersona.ocupacion}
          onChange={(e) =>
            setDatosPersona({ ...datosPersona, ocupacion: e.target.value })
          }
        >
          <option value="">Selecciona ocupacion</option>
          {ocupaciones.map((ocupacion) => (
            <option key={ocupacion.id} value={ocupacion.id}>
              {ocupacion.ocupacion}
            </option>
          ))}
        </select>
        {/* -------- Boton --------*/}
        <input type="submit" value="Registrar" />
      </form>
    </div>
  );
};

export default AgregarPersona;
