import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Axios from 'axios';
import Swal from 'sweetalert2';
// Estilos a Utilizar
import '../Styles/InicioSesion.css';
// Imagenes a Utilizar
//import ImagenDefault from '../Images/FaltaImagen.png';
import Logo from '../Images/logo-escar-recort.png';

function InicioSesion() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Realizar la solicitud POST al backend para verificar las credenciales
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password
    }).then((response) => {
      if (response.data.authenticated) {
        Swal.fire({
          title: "¡Bienvenido!",
          text: "Has iniciado sesión correctamente.",
          icon: "success",
          confirmButtonText: "Continuar"
        }).then(() => {
          navigate("/Gv3nt4_Mngt!2024");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.message, // Mensaje correcto del backend
          confirmButtonText: "Intentar de nuevo"
        });
      }
    }).catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Error en el servidor",
        text: "Hubo un problema al procesar tu solicitud.",
        footer: error.message
      });
    });
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <img src={Logo} alt="Logo Editorial ESCAR" className="logo" />
        <h1>Editorial ESCAR
        <h2>Gestión y Administración</h2></h1>
      </header>

      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Nombre:</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <Link to="/admin-message" className="password-link">¿Cuál es mi Contraseña?</Link>
        <button type="submit" className="back-button">Iniciar Sesión</button>
      </form>

      <Link to="/inicio" className="back-button">Volver a Inicio</Link>
    </div>
  );
}

export default InicioSesion;