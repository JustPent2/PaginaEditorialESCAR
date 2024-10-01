import React from 'react';
// Componentes a Utilizar
import Header from '../Components/Header';
import Calendario from '../Components/Calendario';
import Post from '../Components/Post';
// Estilos a Utilizar
import '../Styles/Inicio.css';
// Imagenes a Utilizar
//import ImagenDefault from '../Images/FaltaImagen.png';
import Logo from '../Images/logo-escar-recort.png';

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
            titulo="¡Bienvenido al sistema de gestión de ventas e inventario de la editorial ESCAR! Esta es una
            versión preliminar de la aplicación, por lo que los errores o mejoras son de esperarse, de parte del equipo de
            desarrollo te alentamos a comentar tus mejoras para nuestra retroalimentación. Esperamos que este sistema sea de tu
            ayuda."
            descripcion="Mensaje Administrativo"
            imagen1={Logo}
            nombre="ESCAR"
          />
          {/* Post 2 */}
          <Post 
            titulo="Actualmente los sistemas de comunicación con el desarrollador no se encuentran disponibles o pueden no ser
            efectivas, por favor cualquier comentario del sistema comunicar directamente con el desarrollador."
            descripcion="Mensaje Administrativo"
            imagen1={Logo}
            nombre="ESCAR"
          />
          {/* Espacio para nuevos post */}
        </div>
      </section>
    </main>
  );
}

export default Inicio;