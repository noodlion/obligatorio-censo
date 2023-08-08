import React from "react";
import { useState} from "react";
import "../Styles/AgregarPersona.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { agregarPersona, guardarPersonas } from "../Slices/PersonaSlice";


const AgregarPersona = () => {
  /*Tomo mis datos del login */
  const apiKey = localStorage.getItem("apiKey");
  const idUser = localStorage.getItem("id");
  const fechaHoy = new Date();

  /*-------- Defino objeto persona -------- */
  const [datosPersona, setDatosPersona] = useState({
    idUsuario: idUser,
    nombre: "",
    departamento: "",
    ciudad: "",
    fechaNacimiento: "",
    ocupacion: "",
  });

  const [mensaje, setMensaje] = useState("");

  //Pido las ocupaciones y departamentos guardadas en mi store
  const departamentos = useSelector((state) => state.departamentos.data);
  const ciudades = useSelector((state) => state.ciudades.ciudades);
  const ocupaciones = useSelector((state) => state.ocupaciones.data);
  const personasCensadas = useSelector((state) => state.personas.personas);

  
  const [contador, setContador] = useState(personasCensadas.length);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [ciudadesFiltradas, setCiudadesFiltradas] = useState([]);
  const [selectedCiudad, setSelectedCiudad] = useState(null);

  const dispatch = useDispatch();

    //129848 ciudad de para harcodear
   const handleCiudad = (e) => {
   const selectedDepartmentoId = e.target.value;
  
    const ciudadesFilt = ciudades.filter(
      (ciud) => ciud.idDepartamento == selectedDepartmentoId
    );
  
    setCiudadesFiltradas(ciudadesFilt);
    setSelectedCiudad(ciudadesFilt.length > 0 ? ciudadesFilt[0].id : null); // Cambio aquí
    setDatosPersona({
      ...datosPersona,
      departamento: selectedDepartmentoId,
    });
  };

  const handleAgregarPersona = async (e) => {
    const url = "https://censo.develotion.com/personas.php";
  
    // Asegúrate de que selectedCiudad sea un valor válido antes de usarlo
    if (selectedCiudad !== null) {
      const updatedDatosPersona = {
        ...datosPersona,
        ciudad: selectedCiudad,
      };
  
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: apiKey,
            iduser: idUser,
          },
          body: JSON.stringify(updatedDatosPersona),
        });
  
        if (response.ok) {
           //console.log("3ra pasada", updatedDatosPersona);
          dispatch(agregarPersona(updatedDatosPersona));
          setMensaje("Se ha agregado una persona");
          setTimeout(() => {
          setMensaje("");
          navigate("/Dashboard");
        }, 2000); // 2 segundos en milisegundos
        } else {
          const data = await response.json();
          setError(data.message || "Error al registrar el usuario.");
        }
      } catch (error) {
        setError("Error al registrar el usuario.");
      }
    } else {
      setError("Por favor, selecciona una ciudad.");
    }
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    handleAgregarPersona();
  };

  return (
    <div>
      <h2>Agregar persona censada</h2>
      <form className="form-persona" onSubmit={onSubmit}>
        {/* -------- Nombre --------*/}
        <label htmlFor="nombreCompleto">Nombre Completo</label>
        <input
          type="text"
          id="nombreCompleto"
          name="nombre"
          placeholder="Juan Perez"
          value={datosPersona.nombre}
          onChange={(e) =>
            setDatosPersona({ ...datosPersona, nombre: e.target.value })
          }
          required
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
          max={fechaHoy}
          onChange={(e) =>
            setDatosPersona({
              ...datosPersona,
              fechaNacimiento: e.target.value,
            })
          }
        />
        {/* ------------------ SELECTS ------------------*/}
        {/* -------- Departamento --------*/}
        <label htmlFor="departamento">Departamento</label>
        <select
          id="departamento"
          name="departamento"
          onChange={handleCiudad}
          required
        >
          <option value="-1">Selecciona un departamento</option>
          {departamentos.map((dep) => (
            <option key={dep.id} value={dep.id}>
              {dep.nombre}
            </option>
          ))}
        </select>

        {/* -------- Ciudad --------*/}
        <label htmlFor="ciudad">Ciudad</label>
        <select id="ciudad" name="ciudadDpto"  required onChange={(e) => setSelectedCiudad(e.target.value)}>
          <option value="-1">Seleccione ciudad</option>
          {ciudadesFiltradas?.map((ciud) => (
            <option value={ciud.id} key={ciud.id}>
              {ciud.nombre}
            </option>
          ))}
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
          <option value="-1">Selecciona ocupacion</option>
          {ocupaciones.map((ocupacion) => (
            <option key={ocupacion.id} value={ocupacion.id}>
              {ocupacion.ocupacion}
            </option>
          ))}
        </select>
        {/* -------- Boton --------*/}
        <input type="submit" value="Registrar" />
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default AgregarPersona;
