import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

function TextFormGesPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [detalleProductos, setDetalleProductos] = useState([]);

  // Cargar los pedidos desde la base de datos
  useEffect(() => {
    axios.get('http://localhost:3001/pedidos')
      .then((response) => {
        setPedidos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los pedidos:', error);
      });
  }, []);

  // Manejar la gestión de un pedido
  const gestionarPedido = (pedido) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas gestionar el pedido de la institución ${pedido.nombre_institucion}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, gestionar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setPedidoSeleccionado(pedido);
        // Obtener los detalles del pedido
        axios.get(`http://localhost:3001/detalle_pedidos/${pedido.id_pedido}`)
          .then((response) => {
            setDetalleProductos(response.data);
          })
          .catch((error) => {
            console.error('Error al obtener los detalles del pedido:', error);
          });
      }
    });
  };

  // Eliminación del Pedido en caso de Cancelar
  const cancelarPedido = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cancelar pedido',
      cancelButtonText: 'No, mantener pedido'
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamar a la API para eliminar el pedido y sus detalles
        fetch(`http://localhost:3001/cancelar_pedido/${pedidoSeleccionado.id_pedido}`, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then((data) => {
            Swal.fire('Eliminado', 'El pedido ha sido cancelado.', 'success');
            // Puedes agregar alguna redirección o actualización de la tabla de pedidos aquí
            setPedidoSeleccionado(null);
            setDetalleProductos([]);
            // Recargar la tabla de pedidos
            cargarPedidos();
          })
          .catch((error) => {
            console.error('Error al cancelar el pedido:', error);
            Swal.fire('Error', 'No se pudo cancelar el pedido', 'error');
          });
      }
    });
  };
  
  // Procesamiento de Pedido en Caso de Aceptar
  const procesarPedido = () => {
    // Llamar a la API para procesar el pedido
    fetch(`http://localhost:3001/procesar_pedido/${pedidoSeleccionado.id_pedido}`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire('Procesado', 'El pedido ha sido procesado exitosamente.', 'success');
        // Puedes agregar alguna redirección o actualización de la tabla de pedidos aquí
        setPedidoSeleccionado(null);
        setDetalleProductos([]);
        // Recargar la tabla de pedidos
        cargarPedidos();
      })
      .catch((error) => {
        console.error('Error al procesar el pedido:', error);
        Swal.fire('Error', 'No se pudo procesar el pedido', 'error');
      });
  };

  // Función para recargar la tabla de pedidos
  const cargarPedidos = () => {
    axios.get('http://localhost:3001/pedidos')
      .then((response) => {
        setPedidos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los pedidos:', error);
      });
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Gestión de Pedidos</h1>
      {/* Tabla de pedidos */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID Pedido</th>
            <th>Nombre Institución</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Total Final</th>
            <th>Fecha Pedido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id_pedido}>
              <td>{pedido.id_pedido}</td>
              <td>{pedido.nombre_institucion}</td>
              <td>{pedido.direccion_institucion}</td>
              <td>{pedido.telefono_institucion}</td>
              <td>Q.{pedido.total_final}</td>
              <td>{new Date(pedido.fecha_pedido).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => gestionarPedido(pedido)}>
                  Gestionar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Sección de detalles del pedido */}
      {pedidoSeleccionado && (
        <div className="card p-4 mb-4">
            <div className="card p-4 mb-4">
                <h3 className="text-center">Detalles del Pedido</h3>
                <div className="row justify-content-center">
                    {/* Primera columna */}
                    <div className="col-md-6">
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1">Nombre Institución:</span>
                            <input
                            type="text"
                            className="form-control"
                            value={pedidoSeleccionado.nombre_institucion}
                            readOnly/>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1">Dirección Institución:</span>
                            <input
                            type="text"
                            className="form-control"
                            value={pedidoSeleccionado.direccion_institucion}
                            readOnly/>
                        </div>
                    </div>
                    </div>

                    {/* Segunda columna */}
                    <div className="col-md-6">
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1">Teléfono Institución:</span>
                            <input
                            type="text"
                            className="form-control"
                            value={pedidoSeleccionado.telefono_institucion}
                            readOnly/>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1">Total Final:</span>
                            <input
                            type="text"
                            className="form-control"
                            value={`Q.${pedidoSeleccionado.total_final}`}
                            readOnly/>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-success mx-2" onClick={procesarPedido}>
                    Procesar Pedido
                </button>
                <button className="btn btn-danger mx-2" onClick={cancelarPedido}>
                    Cancelar Pedido
                </button>
                </div>
            </div>

          {/* Tabla de productos */}
          <h4>Productos Comprados</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Precio Total</th>
              </tr>
            </thead>
            <tbody>
              {detalleProductos.map((detalle) => (
                <tr key={detalle.id_detalle}>
                  <td>{detalle.nombre_producto}</td>
                  <td>{detalle.cantidad}</td>
                  <td>Q.{detalle.precio_unitario}</td>
                  <td>Q.{detalle.precio_total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TextFormGesPedidos;