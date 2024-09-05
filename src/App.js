import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Inicio from './Pages/Inicio';
import QuienesSomos from './Pages/QuienesSomos';
import Anuncios from './Pages/Anuncios';
import ComenyContac from './Pages/ComenyContac';
import Catalogo from './Pages/Catalogo';

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
        {/* Otras rutas */}
      </Routes>
    </Router>
  );
}

export default App;