import React, { useState } from 'react';
import '../Styles/DataTable.css'; // Archivo CSS para los estilos de la tabla

function DataTable() {
  // Simulación de datos de ejemplo
  /*const [data, setData] = useState([
    { nombre1: "Ejemplo 1", nombre2: "Ejemplo 2", nombre3: "Ejemplo 3", nombre4: "Ejemplo 4", nombre5: "Ejemplo 5", nombre6: "Ejemplo 6", nombre7: "Ejemplo 7", nombre8: "Ejemplo 8" },
    { nombre1: "Dato 1", nombre2: "Dato 2", nombre3: "Dato 3", nombre4: "Dato 4", nombre5: "Dato 5", nombre6: "Dato 6", nombre7: "Dato 7", nombre8: "Dato 8" },
  ]);*/

  const [data] = useState([
    { nombre1: "Ejemplo 1", nombre2: "Ejemplo 2", nombre3: "Ejemplo 3", nombre4: "Ejemplo 4", nombre5: "Ejemplo 5", nombre6: "Ejemplo 6", nombre7: "Ejemplo 7", nombre8: "Ejemplo 8" },
    { nombre1: "Dato 1", nombre2: "Dato 2", nombre3: "Dato 3", nombre4: "Dato 4", nombre5: "Dato 5", nombre6: "Dato 6", nombre7: "Dato 7", nombre8: "Dato 8" },
  ]);

  // Función para seleccionar una fila
  const handleRowClick = (index) => {
    console.log("Fila seleccionada: ", data[index]);
    // Aquí podrás realizar las operaciones CRUD sobre la fila seleccionada
  };

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Campo 1</th>
          <th>Campo 2</th>
          <th>Campo 3</th>
          <th>Campo 4</th>
          <th>Campo 5</th>
          <th>Campo 6</th>
          <th>Campo 7</th>
          <th>Campo 8</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} onClick={() => handleRowClick(index)}>
            <td>{row.nombre1}</td>
            <td>{row.nombre2}</td>
            <td>{row.nombre3}</td>
            <td>{row.nombre4}</td>
            <td>{row.nombre5}</td>
            <td>{row.nombre6}</td>
            <td>{row.nombre7}</td>
            <td>{row.nombre8}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;