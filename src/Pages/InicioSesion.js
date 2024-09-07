import React from 'react';
import { Link } from 'react-router-dom';
// Estilos a Utilizar
import '../Styles/InicioSesion.css';
// Imagenes a Utilizar
import ImagenDefault from '../Images/FaltaImagen.png';

function InicioSesion() {
  return (
      <div className="login-container">
        <header className="login-header">
          <img src={ImagenDefault} alt="Logo Editorial ESCAR" className="logo" />
          <h1>Editorial ESCAR<h2>Gestión y Administración</h2></h1>
        </header>

        <form className="login-form">
          <div className="form-group">
            <label htmlFor="username">Nombre:</label>
            <input type="text" id="username" name="username" />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" name="password" />
          </div>
          
          <Link to="/admin-message" className="password-link">¿Cuál es mi Contraseña?</Link>
          <Link to="/Gv3nt4_Mngt!2024" className="back-button">Iniciar Sesión</Link>
        </form>
        <Link to="/inicio" className="back-button">Volver a Inicio</Link>
      </div>
  );
}

export default InicioSesion;