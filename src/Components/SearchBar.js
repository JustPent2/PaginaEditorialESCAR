import React, { useState } from 'react';
// Estilos a Utilizar
import '../Styles/SearchBar.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log(`Searching for: ${searchTerm}`);
    // Aquí se manejaría la búsqueda del registro en la base de datos
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <label htmlFor="search-input">Registro a Buscar: </label>
      <input
        type="text"
        id="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginLeft: '10px', marginRight: '10px' }}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
}

export default SearchBar;