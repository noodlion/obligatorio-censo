import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    let navigate = useNavigate();

    useEffect(() => {
      if (localStorage.getItem("apiKey") === null) {
        navigate("/");
      }
    }, []);

    const handleLogout = () => {
      localStorage.clear();
      navigate("/");
    }
  
    return <button onClick={handleLogout}>Cerrar sesion</button>;
}

export default Logout