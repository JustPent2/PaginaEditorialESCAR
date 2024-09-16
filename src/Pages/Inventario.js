import React from 'react';
// Componentes a Utilizar
import HeaderAdmin from '../Components/HeaderAdmin';
import TextAreaInventario from '../Components/TextFormInventario';
// Estilos a Utilizar
import '../Styles/Inicio.css';
// Imagenes a Utilizar
//import ImagenDefault from '../Images/FaltaImagen.png';

function Inventario() {
  return (
    <main className="inicio">
      <HeaderAdmin />
      <h1>Inventario</h1>
      <TextAreaInventario />
    </main>
  );
}

export default Inventario;