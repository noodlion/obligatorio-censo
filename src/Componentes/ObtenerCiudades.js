import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { guardarCiudades } from "../Slices/CiudadesSlice";

const ObtenerCiudades = () => {
    const dispatch = useDispatch();
    const idUsuario = localStorage.getItem("id");
    const apiKey = localStorage.getItem("apiKey");
    const censo = "https://censo.develotion.com";
    const urlCiudades = `${censo}/ciudades.php`;;
    
    useEffect(() => {
        fetch(urlCiudades, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'apikey': apiKey,
            'iduser': idUsuario
          },
        })
          .then((responseCiudades) => responseCiudades.json())
          .then((datos) => {
            dispatch(guardarCiudades(datos.ciudades))
          })
      }, []);

      const ciudades = useSelector((state) => state.ciudades.ciudades);

      return console.log("CiudadesoObt", ciudades)
}

export default ObtenerCiudades