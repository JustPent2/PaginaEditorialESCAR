import React from 'react';
// Componentes a Utilizar
import HeaderAdmin from '../Components/HeaderAdmin';
import CRUD from '../Components/Crud';
import TextArea from '../Components/TextForm';
import DataTable from '../Components/DataTable';
// Estilos a Utilizar
import '../Styles/Inicio.css';
// Imagenes a Utilizar
//import ImagenDefault from '../Images/FaltaImagen.png';

function Inventario() {
  return (
    <main className="inicio">
      <HeaderAdmin />
      <h1>Inventario</h1>
      <CRUD/>
      <TextArea/>
      <DataTable/>
    </main>
  );
}

export default Inventario;