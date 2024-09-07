import React from 'react';
import '../Styles/TextForm.css'; // Estilos para ajustar el formulario

function TextForm() {
  return (
    <form className="text-form">
      <div className="form-field">
        <label>Campo 1:</label>
        <input type="text" name="nombre1" />
      </div>
      <div className="form-field">
        <label>Campo 2:</label>
        <input type="text" name="nombre2" />
      </div>
      <div className="form-field">
        <label>Campo 3:</label>
        <input type="text" name="nombre3" />
      </div>
      <div className="form-field">
        <label>Campo 4:</label>
        <input type="text" name="nombre4" />
      </div>
      <div className="form-field">
        <label>Campo 5:</label>
        <input type="text" name="nombre5" />
      </div>
      <div className="form-field">
        <label>Campo 6:</label>
        <input type="text" name="nombre6" />
      </div>
      <div className="form-field">
        <label>Campo 7:</label>
        <input type="text" name="nombre7" />
      </div>
      <div className="form-field">
        <label>Campo 8:</label>
        <input type="text" name="nombre8" />
      </div>
    </form>
  );
}

export default TextForm;