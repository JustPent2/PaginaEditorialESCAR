import React, { useState } from 'react';
// Componentes a Utilizar
import HeaderAdmin from '../Components/HeaderAdmin';
import TextAreaSeguridad from '../Components/TextFormSeguridad';
// Estilos a Utilizar
import '../Styles/Seguridad.css';
import '../Styles/Inicio.css';
// Imagenes a Utilizar
//import ImagenDefault from '../Images/FaltaImagen.png';

function Seguridad() {
  return (
    <main className='inicio'>
      <HeaderAdmin/>
      <TextAreaSeguridad/>
    </main>
);
}

export default Seguridad;