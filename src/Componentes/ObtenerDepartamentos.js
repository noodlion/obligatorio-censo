import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { guardarDepartamentos } from "../Slices/DepartamentosSlice";

const ObtenerDepartamentos = () => {
    const dispatch = useDispatch();
    const idUsuario = localStorage.getItem("id");
    const apiKey = localStorage.getItem("apiKey");
    const censo = "https://censo.develotion.com";
    const urlDptos = `${censo}/departamentos.php`;
    
    useEffect(() => {
        fetch(urlDptos, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'apikey': apiKey,
            'iduser': idUsuario
          },
        })
          .then((DptosResponse) => DptosResponse.json())
          .then((datos) => {
            dispatch(guardarDepartamentos(datos.departamentos))
          })
      }, []);
  
      const departamentos = useSelector((state) => state.departamentos);
      return console.log("DptosObt", departamentos)
}

export default ObtenerDepartamentos