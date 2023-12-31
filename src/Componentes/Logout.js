import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Header.css'

const Logout = () => {
    let navigate = useNavigate();

    useEffect(() => {
      if (localStorage.getItem("apiKey") === null) {
        navigate("/");
      }
    }, []);

    const handleLogout = () => {
      localStorage.clear();
      console.clear();
      navigate("/");
    }
  
    return <button className='btn-logout' onClick={handleLogout}>Cerrar sesion</button>    
    
}

export default Logout