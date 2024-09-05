import React from 'react';
// Componentes a Utilizar
import Header from '../Components/Header';
import Calendario from '../Components/Calendario';
import Post from '../Components/Post';
// Estilos a Utilizar
import '../Styles/Inicio.css';
// Imagenes a Utilizar
import ImagenDefault from '../Images/FaltaImagen.png';

function Inicio() {
  return (
    <main className="inicio">
      <Header />
      <section className="anuncios">
        <div className="calendario">
          <Calendario />
        </div>
        <div className="posts">
        <h2>Anuncios</h2>
          {/* Post 1 */}
          <Post 
            titulo="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in volutpat est. 
                Nam placerat eleifend tellus. Mauris semper, nulla eu ultrices suscipit, mauris orci 
                sagittis elit, ac commodo dolor lacus eget libero. Fusce tincidunt, urna et rutrum bibendum, 
                lacus arcu rutrum arcu, nec viverra nulla orci eu sem. Sed eget nisi felis. Donec id faucibus lorem. "
            descripcion="Mensaje Administrativo"
            imagen1={ImagenDefault}
            nombre="ESCAR"
          />
          {/* Post 2 */}
          <Post 
            titulo="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in volutpat est. 
                Nam placerat eleifend tellus. Mauris semper, nulla eu ultrices suscipit, mauris orci 
                sagittis elit, ac commodo dolor lacus eget libero. Fusce tincidunt, urna et rutrum bibendum, 
                lacus arcu rutrum arcu, nec viverra nulla orci eu sem. Sed eget nisi felis. Donec id faucibus lorem. "
            descripcion="Mensaje Administrativo"
            imagen1={ImagenDefault}
            nombre="ESCAR"
          />
        </div>
      </section>
    </main>
  );
}

export default Inicio;