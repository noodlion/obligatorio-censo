import React from "react";
import { useState, useEffect } from "react";
import Persona from "./Persona";

const ListadoPersonas = () => {
  const [personasCensadas, setPersonas] = useState([]);

  const idUsuario = localStorage.getItem("id");
  const apiKey = localStorage.getItem("apiKey");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const censo = "https://censo.develotion.com";
        const url = `${censo}/personas.php?idUsuario=${idUsuario}`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': "application/json",
            'apikey':apiKey,
            'iduser': idUsuario,
          },
        });
        const datos = await response.json();
        setPersonas(datos);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {console.log(personasCensadas)}
    </div>
  );
};


export default ListadoPersonas;
