import React, { useState } from 'react';
import '../Styles/Catalogo.css';
import CartIcon from '../Images/FaltaImagen.png';
import CloseIcon from '../Images/FaltaImagen.png';
import ImagenDefault from '../Images/FaltaImagen.png';

const productsData = [
  {
    id: 1,
    name: 'Producto 0',
    price: 80.00,
    image: ImagenDefault,
  },
  {
    id: 2,
    name: 'Producto 1',
    price: 20.00,
    image: ImagenDefault,
  },
  {
    id: 3,
    name: 'Producto 2',
    price: 50.00,
    image: ImagenDefault,
  },
  {
    id: 4,
    name: 'Producto 3',
    price: 90.00,
    image: ImagenDefault,
  },
  {
    id: 5,
    name: 'Producto 4',
    price: 50.00,
    image: ImagenDefault,
  },
  {
    id: 6,
    name: 'Producto 5',
    price: 50.00,
    image: ImagenDefault,
  },
  {
    id: 7,
    name: 'Producto 6',
    price: 50.00,
    image: ImagenDefault,
  },
  {
    id: 8,
    name: 'Producto 7',
    price: 50.00,
    image: ImagenDefault,
  },
  {
    id: 9,
    name: 'Producto 8',
    price: 50.00,
    image: ImagenDefault,
  },
  {
    id: 10,
    name: 'Producto 9',
    price: 50.00,
    image: ImagenDefault,
  },
];

function ComCatalogo() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productToRemove) => {
    setCart(cart.filter((product) => product !== productToRemove));
  };

  const totalPrice = cart.reduce((acc, product) => acc + product.price, 0);

  return (
    <div className="catalogo">
      <header>
        <h1>Tienda</h1>
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
                      <span className="cantidad-producto-carrito">1</span>
                      <p className="titulo-producto-carrito">{product.name}</p>
                      <span className="precio-producto-carrito">${product.price}</span>
                    </div>
                    <img
                      src={CloseIcon}
                      alt="Eliminar producto"
                      className="icon-close"
                      onClick={() => removeFromCart(product)}
                    />
                  </div>
                ))}
                <div className="cart-total">
                  <h3>Total:</h3>
                  <span className="total-pagar">${totalPrice}</span>
                  {/* REALIZAR FUNCIONAMIENTO DE BOTON */}
                  <button>Cotizar</button>
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