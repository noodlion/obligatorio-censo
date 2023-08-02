import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import ListadoPersonas from "./ListadoPersonas";

const Dashboard = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("apiKey") === null) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Logout />
      <ListadoPersonas/>
    </div>
  );
};

export default Dashboard;
