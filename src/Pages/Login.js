import React from 'react';
// Componentes a Utilizar
import Header from '../Components/Header';
// Estilos a Utilizar
import '../Styles/Inicio.css';
// Imagenes a Utilizar
import ImagenDefault from '../Images/FaltaImagen.png';

function Login() {
  return (
    <main className="inicio">
      <Header />
      <section className="intro">
        <img src={ImagenDefault} alt="Portada" className="intro-image" />
        <div className="intro-text">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in volutpat est. 
            Nam placerat eleifend tellus. Mauris semper, nulla eu ultrices suscipit, mauris orci 
            sagittis elit, ac commodo dolor lacus eget libero. Fusce tincidunt, urna et rutrum bibendum, 
            lacus arcu rutrum arcu, nec viverra nulla orci eu sem. Sed eget nisi felis. Donec id faucibus lorem. 
            Curabitur tincidunt bibendum nibh a molestie. Suspendisse iaculis neque justo, convallis fermentum mi 
            vestibulum non. Proin sollicitudin pulvinar metus, vestibulum molestie massa molestie pretium. Mauris tellus dolor, 
            faucibus ut libero vulputate, pretium feugiat purus. Fusce quis malesuada dui, eget tristique ligula. 
            Praesent mattis interdum eros ac tempor. Etiam luctus sem eu diam tempus, sed lobortis lorem tristique.</p>
        </div>
      </section>
      <section className="galeria">
        <h2>Galería de Imágenes</h2>
        <div className="galeria-grid">
          <img src={ImagenDefault} alt="Imagen 1" />
          <img src={ImagenDefault} alt="Imagen 2" />
          <img src={ImagenDefault} alt="Imagen 3" />
          <img src={ImagenDefault} alt="Imagen 4" />
        </div>
      </section>
    </main>
  );
}

export default Login;