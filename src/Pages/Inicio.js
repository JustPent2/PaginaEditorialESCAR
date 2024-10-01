import React from 'react';
// Componentes a Utilizar
import Header from '../Components/Header';
// Estilos a Utilizar
import '../Styles/Inicio.css';
// Imagenes a Utilizar
//import ImagenDefault from '../Images/FaltaImagen.png';
import LibroGen1 from '../Images/LibroGen1.jpg';
import ImagenGaleria1 from '../Images/ImagenBase1.jpg';
import ImagenGaleria2 from '../Images/ImagenBase2.jpg';
import ImagenGaleria3 from '../Images/ImagenBase3.jpg';
import ImagenGaleria4 from '../Images/ImagenBase4.jpg';

function Inicio() {
  return (
    <main className="inicio">
      <Header />
      <section className="intro">
        <img src={LibroGen1} alt="Portada" className="intro-image" />
        <div className="intro-text">
          <p>La editorial ESCAR se dedica a la distribución y promoción de materiales educativos 
            especializados en la caligrafía y ortografía, sin dejar de lado otros campos de estudio 
            para la formación de cualquier tipo de estudiante. Acompáñenos en nuestro camino en el 
            constante desarrollo de la excelencia académica y la búsqueda por el avance inquebrantable 
            del país de Guatemala, fomentando paso a paso la buena formación en base a nuestros excelentes 
            recursos educativos.</p>
        </div>
      </section>
      <section className="galeria">
        <h2>Galería de Imágenes</h2>
        <div className="galeria-grid">
          <img src={ImagenGaleria1} alt="Imagen 1" />
          <img src={ImagenGaleria2} alt="Imagen 2" />
          <img src={ImagenGaleria3} alt="Imagen 3" />
          <img src={ImagenGaleria4} alt="Imagen 4" />
        </div>
      </section>
    </main>
  );
}

export default Inicio;