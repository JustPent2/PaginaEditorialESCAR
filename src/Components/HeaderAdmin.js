import React from 'react';
// Estilos a Utilizar
import '../Styles/Header.css';
// Imagenes a Utilizar
//import ImagenDefault from '../Images/FaltaImagen.png';
import Logo from '../Images/logo-escar-recort.png';

function HeaderAdmin() {
  return (
    <header className="header">
      <div className="logo">
        <img src={Logo} alt="Editorial ESCAR" />
        <h1>Editorial ESCAR</h1>
      </div>
      <nav className="nav-menu">
        <a href="/PaginaEditorialESCAR/Gv3nt4_Mngt!2024">Gestion de Ventas</a>
        <a href="/PaginaEditorialESCAR/1nv@T_0562!xyz">Inventario</a>
        <a href="/PaginaEditorialESCAR/XqF4!S3Cur1tY">Seguridad</a>
        <a href="/PaginaEditorialESCAR/R3gY_@9834xQr">Registros</a>
      </nav>
      <a href="/PaginaEditorialESCAR/inicio" className="login-button">Cerrar Sesión</a>
    </header>
  );
}

export default HeaderAdmin;