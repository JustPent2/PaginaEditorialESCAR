import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
// Estilos a Utilizar
import '../Styles/Catalogo.css';
// Imagenes a Utilizar
import CartIcon from '../Images/FaltaImagen.png';
import CloseIcon from '../Images/FaltaImagen.png';
import ImagenDefault from '../Images/FaltaImagen.png';

const productsData = [
  {
    id: 1,
    name: 'Digitación Moderna',
    price: 90.00,
    image: ImagenDefault,
  },
  {
    id: 2,
    name: 'Digitación Moderna con Espiral',
    price: 95.00,
    image: ImagenDefault,
  },
  {
    id: 3,
    name: 'Temario de Velocidad Mecanográfica',
    price: 75.00,
    image: ImagenDefault,
  },
  {
    id: 4,
    name: 'Cuaderno de Trabajo para Práctica de Oficina I',
    price: 75.00,
    image: ImagenDefault,
  },
  {
    id: 5,
    name: 'Cuaderno de Trabajo para Práctica de Oficina II',
    price: 75.00,
    image: ImagenDefault,
  },
  {
    id: 6,
    name: 'Análisis y Aplicación de Ortografía Moderna',
    price: 175.00,
    image: ImagenDefault,
  },
  {
    id: 7,
    name: 'Libros de Taquigrafía Speedwriting I, II y III en Español',
    price: 75.00,
    image: ImagenDefault,
  },
  {
    id: 8,
    name: 'Libros de Shorthand Speedwriting ABC, I, II, y III',
    price: 75.00,
    image: ImagenDefault,
  },
  {
    id: 9,
    name: 'Taller de Dictado y Transcripción de Taquigrafía',
    price: 75.00,
    image: ImagenDefault,
  },
  {
    id: 10,
    name: 'Dictation and Transcription',
    price: 75.00,
    image: ImagenDefault,
  },
];

function ComCatalogo() {
  const [cart, setCart] = useState([]);
  const [nombreInstitucion, setNombreInstitucion] = useState('');
  const [direccionInstitucion, setDireccionInstitucion] = useState('');
  const [telefonoInstitucion, setTelefonoInstitucion] = useState('');

  const addToCart = async (product) => {
    const { value: cantidad } = await Swal.fire({
      title: 'Cantidad',
      input: 'number',
      inputLabel: '¿Cuántos productos desea añadir?',
      inputValue: 1,
      inputAttributes: {
        min: 1,
        step: 1
      },
      confirmButtonText: 'Añadir al carrito',
      showCancelButton: true
    });

    if (cantidad) {
      const newProduct = { ...product, cantidad: parseInt(cantidad, 10) };
      setCart([...cart, newProduct]);
    }
  };

  const removeFromCart = (productToRemove) => {
    setCart(cart.filter((product) => product !== productToRemove));
  };

  const totalPrice = cart.reduce((acc, product) => acc + (product.price * (product.cantidad || 1)), 0);

  const cotizarPedido = () => {
    if (cart.length === 0) {
      Swal.fire("Advertencia", "No hay productos en el carrito para cotizar", "warning");
      return;
    }

    if (!nombreInstitucion || !direccionInstitucion || !telefonoInstitucion) {
      Swal.fire("Advertencia", "Por favor ingrese todos los datos de la institución", "warning");
      return;
    }

    const pedido = {
      nombre_institucion: nombreInstitucion,
      direccion_institucion: direccionInstitucion,
      telefono_institucion: telefonoInstitucion,
      productos: cart,
      total_final: totalPrice,
    };

    axios.post('http://localhost:3001/cotizar', pedido)
      .then((response) => {
        Swal.fire("Éxito", "Cotización enviada exitosamente", "success");
        setCart([]);  // Limpiamos el carrito después de enviar la cotización
        setNombreInstitucion('');
        setDireccionInstitucion('');
        setTelefonoInstitucion('');
      })
      .catch((error) => {
        console.error('Error al enviar la cotización:', error);
        Swal.fire("Error", "La cotización no se realizó correctamente", "error");
      });
  };

  return (
    <div className="catalogo">
            <div className="card p-4 mb-4">
        <h2 className="mb-4">Información de la Institución</h2>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="nombreInstitucion" className="form-label">Nombre de la Institución:</label>
            <input
              type="text"
              id="nombreInstitucion"
              className="form-control"
              value={nombreInstitucion}
              onChange={(e) => setNombreInstitucion(e.target.value)}/>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="direccionInstitucion" className="form-label">Dirección de la Institución:</label>
            <input
              type="text"
              id="direccionInstitucion"
              className="form-control"
              value={direccionInstitucion}
              onChange={(e) => setDireccionInstitucion(e.target.value)}/>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="telefonoInstitucion" className="form-label">Teléfono de la Institución:</label>
            <input
              type="text"
              id="telefonoInstitucion"
              className="form-control"
              value={telefonoInstitucion}
              onChange={(e) => setTelefonoInstitucion(e.target.value)}/>
          </div>
        </div>
      </div>

      <header>
        <h1>Catálogo</h1>
        <div className="container-icon">
          <img src={CartIcon} alt="Carrito de compras" className="icon-cart" />
          <div className="count-products">
            <span>{cart.length}</span>
          </div>

          <div className={`container-cart-products ${cart.length === 0 ? 'hidden-cart' : ''}`}>
            {cart.length === 0 ? (
              <p>Tu carrito está vacío.</p>
            ) : (
              <>
                {cart.map((product, index) => (
                  <div className="cart-product" key={index}>
                    <div className="info-cart-product">
                      <span className="cantidad-producto-carrito">{product.cantidad}</span>
                      <p className="titulo-producto-carrito">{product.name}</p>
                      <span className="precio-producto-carrito">${product.price * (product.cantidad || 1)}</span>
                    </div>
                    <img
                      src={CloseIcon}
                      alt="Eliminar producto"
                      className="icon-close"
                      onClick={() => removeFromCart(product)}/>
                  </div>
                ))}
                <div className="cart-total">
                  <h3>Total:</h3>
                  <span className="total-pagar">${totalPrice}</span>
                  <button onClick={cotizarPedido} className='card-button'>Cotizar</button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="container-items">
        {productsData.map((product) => (
          <div className="item" key={product.id}>
            <figure>
              <img src={product.image} alt={product.name} />
            </figure>
            <div className="info-product">
              <h2>{product.name}</h2>
              <p className="Precio">Q.{product.price}</p>
              <button onClick={() => addToCart(product)}>Añadir al carrito</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComCatalogo;