import React from 'react';
// Estilos a Utilizar
import '../Styles/MediosContacto.css';
// Imagenes a Utilizar
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
          <a href="mailto:edit.escar@gmail.com ">
            <img src={EmailIcon} alt="Correo electrónico" />
            edit.escar@gmail.com 
          </a>
        </li>
        <li>
          <a href="https://x.com/EditorialESCAR" target="_blank" rel="noopener noreferrer">
            <img src={TwitterIcon} alt="Twitter" />
            Editorial Escar
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/share/PMXeQJ8mvEP2YKF5/?mibextid=qi2Omg" target="_blank" rel="noopener noreferrer">
            <img src={FacebookIcon} alt="Facebook" />
            Editorial Escar 
          </a>
        </li>
        <li>
          <a href="https://wa.me/23621087" target="_blank" rel="noopener noreferrer">
            <img src={WhatsappIcon} alt="WhatsApp" />
            2362-1087 / 2331-6077 
          </a>
        </li>
      </ul>
    </section>
  );
}

export default MediosContacto;