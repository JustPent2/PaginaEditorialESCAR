import React from 'react';
// Componentes a Utilizar
import HeaderAdmin from '../Components/HeaderAdmin';
import VerRegistros from '../Components/TextFormRegistros';
// Estilos a Utilizar
import '../Styles/Inicio.css';
// Imagenes a Utilizar
//import ImagenDefault from '../Images/FaltaImagen.png';

function Registros() {
  return (
    <main className="inicio">
      <HeaderAdmin />
      <VerRegistros/>
    </main>
  );
}

export default Registros;