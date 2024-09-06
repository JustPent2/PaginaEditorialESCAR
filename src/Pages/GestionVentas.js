import React from 'react';
// Componentes a Utilizar
import HeaderAdmin from '../Components/HeaderAdmin';
// Estilos a Utilizar
import '../Styles/Inicio.css';
// Imagenes a Utilizar
//import ImagenDefault from '../Images/FaltaImagen.png';

function GestionVentas() {
  return (
    <main className="inicio">
      <HeaderAdmin />
      <h1>Gestión de Ventas</h1>
    </main>
  );
}

export default GestionVentas;