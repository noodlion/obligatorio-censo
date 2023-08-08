import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { guardarOcupaciones } from '../Slices/OcupacionesSlice';

const ObtenerOcupaciones = () => {
    const dispatch = useDispatch();
    const idUsuario = localStorage.getItem("id");
    const apiKey = localStorage.getItem("apiKey");
    const censo = "https://censo.develotion.com";
    const urlOcupaciones = `${censo}/ocupaciones.php`;
    
    useEffect(() => {
        fetch(urlOcupaciones, {
          method: 'GET',
          body: JSON.stringify(),
          headers: {
            'Content-type': 'application/json',
            'apikey': apiKey,
            'iduser': idUsuario
          },
        })
          .then((response) => response.json())
          .then((datos) => {
            dispatch(guardarOcupaciones(datos.ocupaciones))
          })
      }, []);

      const ocupaciones = useSelector((state) => state.ocupaciones);
      return console.log("ObtenerOcu", ocupaciones)
}

export default ObtenerOcupaciones