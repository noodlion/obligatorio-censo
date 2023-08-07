import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import ListadoPersonas from "./ListadoPersonas";

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
          <Logout />
          <ListadoPersonas />
        </div>
      )} 
    </div>
  );
};

export default Dashboard;
