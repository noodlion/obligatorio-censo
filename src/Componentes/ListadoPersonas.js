import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guardarPersonas } from "../Slices/PersonaSlice";
import Persona from "./Persona";

const ListadoPersonas = () => {
  const personasCensadas = useSelector(
    (state) => state.personas.personas // Obtiene el array de personas del estado
  );
  const dispatch = useDispatch();

  const idUsuario = localStorage.getItem("id");
  const apiKey = localStorage.getItem("apiKey");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const censo = "https://censo.develotion.com";
        const url = `${censo}/personas.php?idUsuario=${idUsuario}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            apikey: apiKey,
            iduser: idUsuario,
          },
        });
        const datos = await response.json();
        dispatch(guardarPersonas(datos.personas));
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [dispatch, apiKey, idUsuario]);

  return (
    <div>
      {personasCensadas.map((persona) => (
        <Persona persona={persona} />
      ))}
    </div>
    // console.log(personasCensadas)
  );
};

export default ListadoPersonas;
