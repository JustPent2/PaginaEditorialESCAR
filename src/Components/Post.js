import React, { useState } from 'react';
import './Post.css';

function PracticaParcial2({titulo, descripcion, imagen1, nombre}){
    return(
        <div className = "post">
           <div className = "postHeader">
                <img src={imagen1}
                  alt="Imagen" 
                  style={{ width: "75px", 
                  height: "75px", 
                  borderRadius: '50%', 
                  marginRight: '10px'}}/>
                <div className = "perfil">
                    <h3 style={{color:'black'}}>{nombre}</h3>
                    <p style={{color:'gray'}}>{descripcion}</p>
                </div>
           </div>
           <div className="postContenido">
                <p>{titulo}</p>
           </div>
        </div>
    );
}

export default PracticaParcial2;