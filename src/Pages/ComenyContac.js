import React from 'react';
// Componentes a Utilizar
import Header from '../Components/Header';
import Calendario from '../Components/Calendario';
import Formulario from '../Components/Formulario'; // Importa el nuevo componente
// Estilos a Utilizar
import '../Styles/Inicio.css';
// Imagenes a Utilizar
//import ImagenDefault from '../Images/FaltaImagen.png';

function ComenyContac() {
  return (
    <main className="inicio">
      <Header />
      <section className="contacto">
        <Formulario />
      </section>
      <section className="intro">
        <h2>Otros medios</h2>
        
      </section>
    </main>
  );
}

export default ComenyContac;