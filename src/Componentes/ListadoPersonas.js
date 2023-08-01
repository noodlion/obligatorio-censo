import React from "react";
import { useState, useEffect } from "react";
import Persona from "./Persona";

const ListadoPersonas = () => {
  const [personasCensadas, setPersonas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const censo = "https://censo.develotion.com";
        const idUsuario = 6;
        const url = `${censo}/personas.php?idUsuario=${idUsuario}`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': "application/json",
            'apikey': "4171e00ddf882b0c971147a8fb2dce72",
            'iduser': "6",
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
