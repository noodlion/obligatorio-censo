import React from 'react'
import {useEffect, useState} from "react"

const TiempoRestante = () => {
  //Setteo la fecha en que finaliza el censo
  const fechaFinalCenso = new Date("2023-08-31");
  const fechaActual = new Date();
  const tiempoRestante = Math.ceil((fechaFinalCenso - fechaActual) / (1000 * 60 * 60 * 24));
  
  const [diasRestantes, setDiasRestante] = useState(tiempoRestante);

  useEffect(() => {
    const intervalo = setInterval(() => {
        const fechaActualizada = new Date();
        // (1000 * 60 * 60 * 24) es la cantidad en milisegundos, Math.ceil redonde hacia arriba en nro entero
        const tiempoRestanteActualizado = Math.ceil((fechaFinalCenso - fechaActualizada) / (1000 * 60 * 60 * 24));
        setDiasRestante(tiempoRestanteActualizado);
    }, 1000);

    return () => clearInterval(intervalo); // Limpiar el intervalo cuando el componente se desmonte
}, [fechaFinalCenso]);
  
  return (
    <div>
        <p>Tiempo restante para finalizar el censo: {diasRestantes} días</p>
    </div>
  )
}

export default TiempoRestante
