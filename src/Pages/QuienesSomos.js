import React from 'react';
// Componentes a Utilizar
import Header from '../Components/Header';
// Estilos a Utilizar
import '../Styles/Inicio.css';
// Imagenes a Utilizar
import ImagenDefault from '../Images/FaltaImagen.png';

function Inicio() {
  return (
    <main className="inicio">
      <Header />
      <section className="quienessomos">
        <h2>Visión</h2>
            <p className='reducido'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in volutpat est. 
                Nam placerat eleifend tellus. Mauris semper, nulla eu ultrices suscipit, mauris orci 
                sagittis elit, ac commodo dolor lacus eget libero. Fusce tincidunt, urna et rutrum bibendum, 
                lacus arcu rutrum arcu, nec viverra nulla orci eu sem. Sed eget nisi felis. Donec id faucibus lorem. 
            </p>
        <h2>Misión</h2>
            <p className='reducido'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in volutpat est. 
                Nam placerat eleifend tellus. Mauris semper, nulla eu ultrices suscipit, mauris orci 
                sagittis elit, ac commodo dolor lacus eget libero. Fusce tincidunt, urna et rutrum bibendum, 
                lacus arcu rutrum arcu, nec viverra nulla orci eu sem. Sed eget nisi felis. Donec id faucibus lorem. 
            </p>
        <h2>Valores</h2>
            <p className='reducido'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in volutpat est. 
                Nam placerat eleifend tellus. Mauris semper, nulla eu ultrices suscipit, mauris orci 
                sagittis elit, ac commodo dolor lacus eget libero. Fusce tincidunt, urna et rutrum bibendum, 
                lacus arcu rutrum arcu, nec viverra nulla orci eu sem. Sed eget nisi felis. Donec id faucibus lorem. 
            </p>
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

export default Inicio;