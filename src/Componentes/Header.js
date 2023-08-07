import React from 'react'
import Logout from './Logout';
import TiempoRestante from './TiempoRestante';
import '../Styles/Header.css'

const Header = () => {
    
    return (
      <header className='header'>
        <TiempoRestante/>
        <Logout/>
      </header>
    );
    
}

export default Header