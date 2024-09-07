import React, { useState } from 'react';
// Componentes a Utilizar
import HeaderAdmin from '../Components/HeaderAdmin';
import CRUD from '../Components/Crud';
import TextArea from '../Components/TextForm';
import DataTable from '../Components/DataTable';
import SearchBar from '../Components/SearchBar';
// Estilos a Utilizar
import '../Styles/Seguridad.css';
import '../Styles/Inicio.css';
// Imagenes a Utilizar
//import ImagenDefault from '../Images/FaltaImagen.png';

function Seguridad() {
  // Estado para gestionar la pestaña activa
  const [activeTab, setActiveTab] = useState('GestionUsuarios');

  // Función para cambiar entre pestañas
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <main className='inicio'>
      <HeaderAdmin/>
      <div className="seguridad">
          <div className="tab-bar">
            <button 
              className={activeTab === 'GestionUsuarios' ? 'active' : ''} 
              onClick={() => handleTabClick('GestionUsuarios')}>
              Gestión de Usuarios
            </button>
            <button 
              className={activeTab === 'Bitacora' ? 'active' : ''} 
              onClick={() => handleTabClick('Bitacora')}>
              Bitácora
            </button>
          </div>

          {/* Contenido de las pestañas */}
          <div className="tab-content">
            {activeTab === 'GestionUsuarios' && (
              <div>
                <h2>Gestión de Usuarios</h2>
                <CRUD/>
                <TextArea/>
                <DataTable/>
              </div>
            )}
            {activeTab === 'Bitacora' && (
              <div>
                <h2>Bitácora</h2>
                <p>Aquí puedes revisar los registros y actividades realizadas en el sistema.</p>
                <SearchBar />
                <DataTable/>
              </div>
            )}
          </div>
        </div>
    </main>
);
}

export default Seguridad;