import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Persona from "./Persona";
import { guardarPersonas } from "../Slices/PersonaSlice";
import { guardarDepartamentos } from "../Slices/DepartamentosSlice";
import { guardarCiudades } from "../Slices/CiudadesSlice";

const ListadoPersonas = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const departamentos = useSelector(
    (state) => state.departamentos.departamentos
  );
  const ciudades = useSelector((state) => state.ciudades.ciudades);
  const personasCensadas = useSelector(
    (state) => state.personas.personas // Obtiene el array de personas del estado
  );

  const idUsuario = localStorage.getItem("id");
  const apiKey = localStorage.getItem("apiKey");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const censo = "https://censo.develotion.com";
  //       const urlPersonas = `${censo}/personas.php?idUsuario=${idUsuario}`;
  //       const urlDptos = `${censo}/departamentos.php`;
  //       const urlCiudades = `${censo}/ciudades.php`;

  //       //--------------- Fetch a los departamentos ---------------
  //       const departamentosResponse = await fetch(urlDptos, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           apikey: apiKey,
  //           iduser: idUsuario,
  //         },
  //       });
  //       const datosDepartamentos = await departamentosResponse.json();
  //       dispatch(guardarDepartamentos(datosDepartamentos));

  //       //--------------- Fetch a las ciudades ---------------
  //       const ciudadesResponse = await fetch(urlCiudades, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           apikey: apiKey,
  //           iduser: idUsuario,
  //         },
  //       });
  //       const datosCiudades = await ciudadesResponse.json();
  //       dispatch(guardarCiudades(datosCiudades));

  //       //--------------- Fetch a mi lista de personas ---------------
  //       const response = await fetch(urlPersonas, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           apikey: apiKey,
  //           iduser: idUsuario,
  //         },
  //       });

  //       const datos = await response.json();
  //       if (datos.personas === undefined) {
  //         navigate("/Dashboard");
  //       } else {
  //         dispatch(guardarPersonas(datos.personas));
  //       }
  //     } catch (error) {
  //       console.error("Error al obtener los datos:", error);
  //     }
  //   };

  //   fetchData();
  // }, [dispatch, apiKey, idUsuario]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const censo = "https://censo.develotion.com";
        const urlPersonas = `${censo}/personas.php?idUsuario=${idUsuario}`;
        const urlDptos = `${censo}/departamentos.php`;
        const urlCiudades = `${censo}/ciudades.php`;

        // Realizar las tres solicitudes en paralelo
        const [departamentosResponse, ciudadesResponse, personasResponse] =
          await Promise.all([
            fetch(urlDptos, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                apikey: apiKey,
                iduser: idUsuario,
              },
            }),
            fetch(urlCiudades, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                apikey: apiKey,
                iduser: idUsuario,
              },
            }),
            fetch(urlPersonas, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                apikey: apiKey,
                iduser: idUsuario,
              },
            }),
          ]);

        const datosDepartamentos = await departamentosResponse.json();
        const datosCiudades = await ciudadesResponse.json();
        const datosPersonas = await personasResponse.json();

        dispatch(guardarDepartamentos(datosDepartamentos));
        console.log(datosDepartamentos);
        dispatch(guardarCiudades(datosCiudades));
        console.log(datosCiudades);

        if (datosPersonas.personas === undefined) {
          navigate("/Dashboard");
        } else {
          dispatch(guardarPersonas(datosPersonas.personas));
        }
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
  );
};

export default ListadoPersonas;
