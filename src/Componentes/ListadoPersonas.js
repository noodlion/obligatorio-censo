import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Persona from "./Persona";
import "../Styles/ListadoPersonas.css";
import {
  agregarPersona,
  eliminarPersona,
  guardarPersonas,
} from "../Slices/PersonaSlice";
import { guardarDepartamentos } from "../Slices/DepartamentosSlice";
import { guardarCiudades } from "../Slices/CiudadesSlice";
import { guardarOcupaciones } from "../Slices/OcupacionesSlice";

const ListadoPersonas = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Obtencion de datos
  const departamentos = useSelector((state) => state.departamentos);
  const ciudades = useSelector((state) => state.ciudades.ciudades);
  const ocupaciones = useSelector((state) => state.ocupaciones);
  const personasCensadas = useSelector((state) => state.personas.personas);
  //State para corroborar que todos mis datos esten cargados
  const [loading, setLoading] = useState(true);

  const idUsuario = localStorage.getItem("id");
  const apiKey = localStorage.getItem("apiKey");
  const censo = "https://censo.develotion.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlPersonas = `${censo}/personas.php?idUsuario=${idUsuario}`;
        const urlDptos = `${censo}/departamentos.php`;
        const urlCiudades = `${censo}/ciudades.php`;
        const urlOcupaciones = `${censo}/ocupaciones.php`;

        // Realizar las 4 solicitudes al mismo tiempo en vez de hacer fetch distintos
        const [
          departamentosResponse,
          ciudadesResponse,
          personasResponse,
          ocupacionesResponse,
        ] = await Promise.all(
          [
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
            fetch(urlOcupaciones, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                apikey: apiKey,
                iduser: idUsuario,
              },
            }),
          ],
          []
        );

        const datosDepartamentos = await departamentosResponse.json();
        const datosCiudades = await ciudadesResponse.json();
        const datosPersonas = await personasResponse.json();
        const datosOcupaciones = await ocupacionesResponse.json();

        if (
          datosPersonas.personas === undefined ||
          datosCiudades.ciudades === undefined ||
          datosOcupaciones.ocupaciones === undefined ||
          datosDepartamentos.departamentos === undefined
        ) {
          navigate("/Dashboard");
        } else {
          dispatch(guardarPersonas(datosPersonas.personas));
          dispatch(guardarDepartamentos(datosDepartamentos.departamentos));
          dispatch(guardarCiudades(datosCiudades.ciudades));
          dispatch(guardarOcupaciones(datosOcupaciones.ocupaciones));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [eliminarPersona]);
  // }, [dispatch, apiKey, idUsuario]);

  return (
    <div className="listado-container">
      <h2 className="listado-heading">Personas censadas</h2>
      <table className="listado-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Departamento</th>
            <th>Ciudad</th>
            <th>Fecha de Nacimiento</th>
            <th>Ocupación</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr className="listado-loading">
              <td colSpan="5">Cargando...</td>
            </tr>
          ) : (
            personasCensadas.map((persona) => (
              <Persona
                key={persona.id}
                persona={persona}
                departamentos={departamentos}
                ciudades={ciudades}
                ocupaciones={ocupaciones}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoPersonas;

// import React, { useEffect } from "react";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import Persona from "./Persona";
// import '../Styles/ListadoPersonas.css'
// import { eliminarPersona, guardarPersonas } from "../Slices/PersonaSlice";

// const ListadoPersonas = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   // Obtencion de datos
//   const personasCensadas = useSelector((state) => state.personas.personas);
//   const departamentos = useSelector((state) => state.departamentos);
//   const ciudades = useSelector((state) => state.ciudades.ciudades);
//   const ocupaciones = useSelector((state) => state.ocupaciones);

//   //State para corroborar que todos mis datos esten cargados
//   const [loading, setLoading] = useState(true);

//   const idUsuario = localStorage.getItem("id");
//   const apiKey = localStorage.getItem("apiKey");
//   const censo = "https://censo.develotion.com";

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const urlPersonas = `${censo}/personas.php?idUsuario=${idUsuario}`;
//         const personasResponse = await fetch(urlPersonas, {
//           method: "GET",
//           headers: {
//             "Content-type": "application/json",
//             apikey: apiKey,
//             iduser: idUsuario,
//           },
//         });

//         const datosPersonas = await personasResponse.json();

//         if (datosPersonas.personas === undefined) {
//           navigate("/Dashboard");
//         } else {
//           dispatch(guardarPersonas(datosPersonas.personas));
//         }

//         setLoading(false);
//       } catch (error) {
//         console.error("Error al obtener los datos:", error);
//       }
//     };

//     fetchData();
//   }, [eliminarPersona]);

//   return (
//     <div className="listado-container">
//       <h2 className="listado-heading">Personas censadas</h2>
//       <table className="listado-table">
//         <thead>
//           <tr>
//             <th>Nombre</th>
//             <th>Departamento</th>
//             <th>Ciudad</th>
//             <th>Fecha de Nacimiento</th>
//             <th>Ocupación</th>
//           </tr>
//         </thead>
//         <tbody>
//           {loading ? (
//             <tr className="listado-loading">
//               <td colSpan="5">Cargando...</td>
//             </tr>
//           ) : (
//             personasCensadas.map((persona) => (
//               <Persona
//                 key={persona.id}
//                 persona={persona}
//                 departamentos={departamentos}
//                 ciudades={ciudades}
//                 ocupaciones={ocupaciones}
//               />
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ListadoPersonas;
