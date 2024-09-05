// Header.js
import React from 'react';
import '../Styles/Header.css';
// Imagenes a Utilizar
import ImagenDefault from '../Images/FaltaImagen.png';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={ImagenDefault} alt="Editorial ESCAR" />
        <h1>Editorial ESCAR</h1>
      </div>
      <nav className="nav-menu">
        <a href="/inicio">Inicio</a>
        <a href="/quienes-somos">¿Quiénes somos?</a>
        <a href="/anuncios">Anuncios</a>
        <a href="/comenycontac">Comentarios y Contacto</a>
        <a href="/catalogo">Catálogo</a>
      </nav>
      <a href="/login" className="login-button">Inicio de Sesión</a>
    </header>
  );
}

export default Header;