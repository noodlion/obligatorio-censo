import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import ListadoPersonas from "./ListadoPersonas";
import AgregarPersona from "./AgregarPersona";
import ObtenerCiudades from "./ObtenerCiudades";
import ObtenerDepartamentos from "./ObtenerDepartamentos";
import ObtenerOcupaciones from "./ObtenerOcupaciones";

const Dashboard = () => {
  let navigate = useNavigate();
  const [usuarioLogeado, setUsuarioLogeado] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("apiKey")) {
      setUsuarioLogeado(true);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      {usuarioLogeado && (
        <div>
          <Header />
          <AgregarPersona />
          <ListadoPersonas />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
