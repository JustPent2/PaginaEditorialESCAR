import React from 'react';
// Estilos a Utilizar
import '../Styles/Header.css';
// Imagenes a Utilizar
//import ImagenDefault from '../Images/FaltaImagen.png';
import Logo from '../Images/logo-escar-recort.png';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={Logo} alt="Editorial ESCAR" />
        <h1>Editorial ESCAR</h1>
      </div>
      <nav className="nav-menu">
        <a href="/PaginaEditorialESCAR/inicio">Inicio</a>
        <a href="/PaginaEditorialESCAR/quienes-somos">¿Quiénes somos?</a>
        <a href="/PaginaEditorialESCAR/anuncios">Anuncios</a>
        <a href="/PaginaEditorialESCAR/comenycontac">Comentarios y Contacto</a>
        <a href="/PaginaEditorialESCAR/catalogo">Catálogo</a>
      </nav>
      <a href="/PaginaEditorialESCAR/iniciosesion" className="login-button">Inicio de Sesión</a>
    </header>
  );
}

export default Header;