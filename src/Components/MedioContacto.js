import React from 'react';
import '../Styles/MediosContacto.css';
import EmailIcon from '../Images/gmail-logo.png';
import TwitterIcon from '../Images/x-logo.png';
import FacebookIcon from '../Images/facebook-logo.png';
import WhatsappIcon from '../Images/whatsapp-logo.png';

function MediosContacto() {
  return (
    <section className="medios-contacto">
      <h2>Otros Medios de Comunicación</h2>
      <ul className="redes-sociales">
        <li>
          <a href="mailto:contacto@editorialescar.com">
            <img src={EmailIcon} alt="Correo electrónico" />
            No Disponible
          </a>
        </li>
        <li>
          <a href="https://twitter.com/editorialescar" target="_blank" rel="noopener noreferrer">
            <img src={TwitterIcon} alt="Twitter" />
            No Disponible
          </a>
        </li>
        <li>
          <a href="https://facebook.com/editorialescar" target="_blank" rel="noopener noreferrer">
            <img src={FacebookIcon} alt="Facebook" />
            No Disponible
          </a>
        </li>
        <li>
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
            <img src={WhatsappIcon} alt="WhatsApp" />
            No Disponible
          </a>
        </li>
      </ul>
    </section>
  );
}

export default MediosContacto;