import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    let navigate = useNavigate();

    const handleLogout = () => {
      localStorage.clear();
      navigate("/");
    }
  
    return <button onClick={handleLogout}>Cerrar sesion</button>;
}

export default Logout