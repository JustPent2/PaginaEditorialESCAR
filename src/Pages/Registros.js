import React from 'react';
// Componentes a Utilizar
import HeaderAdmin from '../Components/HeaderAdmin';
import DataTable from '../Components/DataTable';
import SearchBar from '../Components/SearchBar';
// Estilos a Utilizar
import '../Styles/Inicio.css';
// Imagenes a Utilizar
//import ImagenDefault from '../Images/FaltaImagen.png';

function Registros() {
  return (
    <main className="inicio">
      <HeaderAdmin />
      <h1>Registros</h1>
      <SearchBar />
      <DataTable/>
    </main>
  );
}

export default Registros;