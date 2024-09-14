import React from 'react';
// Estilos a Utilizar
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Páginas de Principal a Utilizar
import Inicio from './Pages/Inicio';
import QuienesSomos from './Pages/QuienesSomos';
import Anuncios from './Pages/Anuncios';
import ComenyContac from './Pages/ComenyContac';
import Catalogo from './Pages/Catalogo';
// Página de Inicio de Sesión
import InicioSesion from './Pages/InicioSesion';
import Comodin from './Pages/Comodin';
// Páginas de Uso Interno
import GestionVentas from './Pages/GestionVentas';
import Inventario from './Pages/Inventario';
import Seguridad from './Pages/Seguridad';
import Registros from './Pages/Registros';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta predeterminada que redirige a /inicio */}
        <Route path="/" element={<Navigate to="/inicio" />} />
        
        {/* Rutas normales */}
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/anuncios" element={<Anuncios />} />
        <Route path="/comenycontac" element={<ComenyContac />} />
        <Route path="/catalogo" element={<Catalogo />} />
        {/* Ruta e Inicio de Sesión */}
        <Route path="/iniciosesion" element={<InicioSesion />} />
        <Route path="/admin-message" element={<Comodin />} />
        {/* Rutas Interno */}
        <Route path="/Gv3nt4_Mngt!2024" element={<GestionVentas />} />
        <Route path="/1nv@T_0562!xyz" element={<Inventario />} />
        <Route path="/XqF4!S3Cur1tY" element={<Seguridad />} />
        <Route path="/R3gY_@9834xQr" element={<Registros />} />
        
      </Routes>
    </Router>
  );
}

export default App;