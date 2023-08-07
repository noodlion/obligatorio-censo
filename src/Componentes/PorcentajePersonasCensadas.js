import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const PorcentajePersonasCensadas = () => {
 const [censados, setCensados] = useState("");
  const dispatch = useDispatch();
 
  const idUsuario = localStorage.getItem("id");
  const apiKey = localStorage.getItem("apiKey");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "https://censo.develotion.com/totalCensados.php";
       
        const censadosTot = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            apikey: apiKey, 
            iduser: idUsuario,
          },
        });
  
        setCensados = await censadosTot.json();
        
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    
    fetchData();
  }, [dispatch]); // Agregamos dispatch como dependencia para evitar warnings

  return (
    <div>PorcentajePersonasCensadas</div>
  )
}

export default PorcentajePersonasCensadas;