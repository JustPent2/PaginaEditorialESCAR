import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Importar SweetAlert
import '../Styles/Formulario.css';

function Formulario() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar envío inmediato del formulario

    // Mostrar alerta antes de enviar
    Swal.fire({
      title: "Formulario en pruebas",
      text: "Este formulario se encuentra en pruebas y no puede garantizar su funcionamiento completo.",
      icon: "warning",
      confirmButtonText: "Continuar"
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, enviar el formulario
        e.target.submit();
      }
    });
  };

  return (
    <div className="formulario">
      <h2>Comentarios</h2>
      <form 
        action="https://formsubmit.co/35e9079bd9148fc292591e79c4aa229e"
        method="POST"
        onSubmit={handleSubmit} // Manejar el envío con SweetAlert
      >
        {/* Nombre */}
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />

        {/* Email */}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Asunto */}
        <label htmlFor="asunto">Asunto:</label>
        <input
          type="text"
          id="asunto"
          name="asunto"
          value={formData.asunto}
          onChange={handleChange}
          required
        />

        {/* Mensaje */}
        <label htmlFor="mensaje">Mensaje:</label>
        <textarea
          id="mensaje"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          required
        ></textarea>

        {/* Botón Enviar */}
        <button type="submit">Enviar</button>

        {/* Input oculto para evitar el spam de bots */}
        <input type="hidden" name="_next" value="http://localhost:3000" />
        <input type="hidden" name="_captcha" value="false" />
      </form>
    </div>
  );
}

export default Formulario;