import React from 'react';
// Componentes a Utilizar
import Header from '../Components/Header';
import Formulario from '../Components/Formulario';
import MediosContacto from '../Components/MedioContacto';
// Estilos a Utilizar
import '../Styles/Inicio.css';
// Imagenes a Utilizar

function ComenyContac() {
  return (
    <main className="inicio">
      <Header />
      <section className="contacto">
        <Formulario />
        <MediosContacto />
      </section>
    </main>
  );
}

export default ComenyContac;