import React from 'react';
import '../Styles/Crud.css'; // Estilos para ajustar la disposición de los botones

function Crud() {
  return (
    <div className="crud-container">
      <button onClick={() => { /* Asignar función de Ingresar aquí */ }}>
        Ingresar
      </button>
      <button onClick={() => { /* Asignar función de Buscar aquí */ }}>
        Buscar
      </button>
      <button onClick={() => { /* Asignar función de Modificar aquí */ }}>
        Modificar
      </button>
      <button onClick={() => { /* Asignar función de Eliminar aquí */ }}>
        Eliminar
      </button>
    </div>
  );
}

export default Crud;