import React, { useState } from 'react';
// Componentes a Utilizar
import HeaderAdmin from '../Components/HeaderAdmin';
import GesPedidos from '../Components/TextFormGesPedidos';
import GesConsignaciones from '../Components/TextFormGesConsignaciones';
import GesVentas from '../Components/TextFormGesVentas';
// Estilos a Utilizar
import '../Styles/GestionVentas.css';
import '../Styles/Inicio.css';
// Imagenes a Utilizar
//import ImagenDefault from '../Images/FaltaImagen.png';

function GestionVentas() {
  // Estado para gestionar la pestaña activa
  const [activeTab, setActiveTab] = useState('Pedidos');

  // Función para cambiar entre pestañas
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <main className='inicio'>
      <HeaderAdmin />
        <div className="gestion-ventas">
        <div className="tab-bar">
          <button 
            className={activeTab === 'Pedidos' ? 'active' : ''} 
            onClick={() => handleTabClick('Pedidos')}>
            Pedidos
          </button>
          <button 
            className={activeTab === 'Consignación' ? 'active' : ''} 
            onClick={() => handleTabClick('Consignación')}>
            Consignaciones
          </button>
          <button 
            className={activeTab === 'Ventas' ? 'active' : ''} 
            onClick={() => handleTabClick('Ventas')}>
            Ventas
          </button>
        </div>

        {/* Contenido de las pestañas */}
        <div className="tab-content">
          {activeTab === 'Pedidos' && (
            <div>
              <h2>Gestión de Pedidos</h2>
              <p>Contenido relacionado con los pedidos.</p>
              <GesPedidos/>
            </div>
          )}
          {activeTab === 'Consignación' && (
            <div>
              <h2>Gestión de Consignación</h2>
              <p>Contenido relacionado con las consignación.</p>
              <GesConsignaciones/>
            </div>
          )}
          {activeTab === 'Ventas' && (
            <div>
              <h2>Gestión de Ventas</h2>
              <p>Contenido relacionado con la ventas.</p>
              <GesVentas/>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default GestionVentas;