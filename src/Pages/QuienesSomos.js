import React from 'react';
// Componentes a Utilizar
import Header from '../Components/Header';
// Estilos a Utilizar
import '../Styles/Inicio.css';
// Imagenes a Utilizar
//import ImagenDefault from '../Images/FaltaImagen.png';
import ImagenGaleria5 from '../Images/ImagenBase5.jpg';
import ImagenGaleria6 from '../Images/ImagenBase6.jpg';
import ImagenGaleria7 from '../Images/ImagenBase7.jpg';
import ImagenGaleria8 from '../Images/ImagenBase8.jpg';

function Inicio() {
  return (
    <main className="inicio">
      <Header />
      <section className="quienessomos">
        <h2>Misión</h2>
            <p className='reducido'>
              "La editorial ESCAR es respaldada por años de experiencia en el ámbito educativo y didáctico, 
              que busca ofrecer al pueblo guatemalteco diferentes herramientas innovadoras para fomentar el nuevo
              conocimiento y la creatividad necesarias para avanzar como sociedad en un punto cultural e intelectual."
            </p>
        <h2>Visión</h2>
            <p className='reducido'>
              "Ser una editorial líder en la distribución de contenidos educativos de alta calidad, con el avance constante
               en enfoques innovadores para enriquecer el aprendizaje y el desarrollo cultural, fomentando a la mejora 
               continua de la capacidad intelectual de la población."
            </p>
        <h2>Valores</h2>
            <p className='reducido'>
              <h1>Innovación</h1>
              "Nos comprometemos a incorporar constantemente enfoques creativos en nuestros contenidos para mejorar el aprendizaje y la difusión cultural."
            </p>
            <p className='reducido'>
              <h1>Compromiso con la calidad</h1>
              "Nos aseguramos de que cada material que distribuimos cumpla con los más altos estándares educativos y culturales."
            </p>
            <p className='reducido'>
              <h1>Responsabilidad social</h1>
              "Promovemos el acceso a la educación y la cultura como herramientas esenciales para el desarrollo social e intelectual de Guatemala."
            </p>
            <p className='reducido'>
              <h1>Integridad</h1>
              "Operamos con honestidad, ética y transparencia en todas nuestras interacciones, tanto internas como externas."
            </p>
            <p className='reducido'>
              <h1>Colaboración</h1>
              "Valoramos el trabajo en equipo, tanto dentro de nuestra organización como con nuestros colaboradores, para lograr los mejores resultados."
            </p>
            <p className='reducido'>
              <h1>Mejora continua</h1>
              "Creemos en la constante evolución de nuestros procesos y productos, buscando siempre oportunidades para crecer y mejorar."
            </p>
      </section>
      <section className="galeria">
        <h2>Galería de Imágenes</h2>
        <div className="galeria-grid">
          <img src={ImagenGaleria5} alt="Imagen 1" />
          <img src={ImagenGaleria6} alt="Imagen 2" />
          <img src={ImagenGaleria7} alt="Imagen 3" />
          <img src={ImagenGaleria8} alt="Imagen 4" />
        </div>
      </section>
    </main>
  );
}

export default Inicio;