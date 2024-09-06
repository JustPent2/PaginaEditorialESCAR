import React from 'react';
// Componentes a Utilizar
import Header from '../Components/Header';
import Catalogo from '../Components/ComCatalogo';
// Estilos a Utilizar
import '../Styles/Inicio.css';
// Imagenes a Utilizar

function Inicio() {
  return (
    <main className="inicio">
      <Header />
      <section className="intro">
        <Catalogo />
      </section>
    </main>
  );
}

export default Inicio;