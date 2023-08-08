import React from "react";
import { useDispatch } from "react-redux";
import { eliminarPersona } from "../Slices/PersonaSlice";

const EliminarPersona = ({ personaId }) => {
  const dispatch = useDispatch();
  const idUsuario = localStorage.getItem("id");
  const apiKey = localStorage.getItem("apiKey");
  const censo = "https://censo.develotion.com";

  const handleEliminarPersona = async () => {
    try {
      const response = await fetch(`${censo}/personas.php?idCenso=${personaId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          apikey: apiKey,
          iduser: idUsuario,
        },
      });

      if (response.ok) {
        dispatch(eliminarPersona(personaId)); //Lo saca de mi state
      } else {
        const data = await response.json();
        console.error("Error al eliminar persona:", data.message); //si hay msj en el data lo muestra
      }
    } catch (error) {
      console.error("Error al eliminar persona:", error);
    }
  };

  return <button onClick={handleEliminarPersona}>Eliminar</button>;
};

export default EliminarPersona;
