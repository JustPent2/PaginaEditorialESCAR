import React from 'react';
import '../Styles/Confirmaciones.css'; // Asegúrate de crear este archivo para los estilos

function Confirmaciones() {
  return (
    <div className="confirmaciones-container">
      <button className="btn continuar">Continuar Proceso</button>
      <button className="btn cancelar">Cancelar Proceso</button>
    </div>
  );
}

export default Confirmaciones;