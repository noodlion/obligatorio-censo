import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
import '../Styles/Header.css'

const Header = () => {
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
  
    return (
      <header className='header'>
        <Logout/>
      </header>
    );
    
}

export default Header